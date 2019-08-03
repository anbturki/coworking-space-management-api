"use strict";
/** @type {import('@adonisjs/framework/src/Hash')} */
class QueryFilter {
  static get operators() {
    return ["or", "and"];
  }
  register(Model) {
    const self = this;
    this.modelInstance = Model;
    Model.queryMacro("orderFilter", function(request) {
      if (!request) throw TypeError("please pass the request object");
      self.queryInstance = this;
      let { filter } = request.get();
      filter = self.parseFilter(filter);
      self.filterNodes(this, filter);
      return this;
    });
  }

  filterNodes(queryInstance, filter) {
    if (filter) {
      // Parse filter to JSON Object
      try {
        filter = JSON.parse(filter);
      } catch (error) {}
      // do we need some sorting?
      if (filter.order) {
        this.applyOrder(queryInstance, filter);
      }
      // field selection
      if (filter.fields) {
        this.selectFields(queryInstance, filter);
      }
      // Search
      if (filter.where) {
        this.matchesFilter(queryInstance, filter);
      }
      // relation
      if (filter.include) {
        this.applyRelation(filter);
      }
      // limit/skip
      const skip = filter.skip || filter.offset || 0;
      queryInstance.offset(skip);
      if (filter.limit && filter.limit > 0) {
        queryInstance.limit(filter.limit);
      }
    }

    return queryInstance;
  }
  applyRelation(filter) {
    const include = filter.include;
    if (typeof include === "string") {
      this.queryInstance.with(include);
    } else if (Array.isArray(include)) {
      include.forEach(inc => {
        this.queryInstance.with(inc);
      });
    }
  }
  selectFields(queryInstance, filter) {
    const fields = filter.fields;
    if (typeof fields === "string") {
      if (this.modelInstance.filters.includes(fields)) {
        queryInstance.column(fields);
      } else {
        throw TypeError(`the ${fields} is not listed in your filters`);
      }
    } else if (Array.isArray(fields)) {
      const columns = [];
      fields.forEach(field => {
        if (this.modelInstance.filters.includes(field)) {
          columns.push(field);
        } else {
          throw TypeError(`the ${field} is not listed in your filters`);
        }
      });
      if (columns.length) {
        queryInstance.column(columns);
      }
    }
    return queryInstance;
  }

  applyMatchesFilter(condition, operator) {
    if (condition) {
      // {name: "ali"}
      Object.keys(condition).forEach(key => {
        if (
          (typeof condition[key] === "string" ||
            typeof condition[key] === "boolean" ||
            typeof condition[key] === "number") &&
          this.modelInstance.filters.includes(key)
        ) {
          if (condition === "and") {
            this.queryInstance.andWhere(key, condition[key]);
          } else if (operator === "or") {
            this.queryInstance.orWhere(key, condition[key]);
          } else {
            this.queryInstance.where(key, condition[key]);
          }
        }
      });
    }
  }

  matchesFilter(queryInstance, filter) {
    const where = filter.where;
    Object.keys(where).forEach(key => {
      if (key === "or" || key === "and") {
        // or = [{name: "ali"}]
        if (Array.isArray(where[key])) {
          where[key].forEach(cond => {
            this.applyMatchesFilter(cond, key);
          });
        }
      } else {
        this.applyMatchesFilter({ [key]: where[key] });
      }
    });
  }

  applyOrder(queryInstance, filter) {
    let order = filter.order;
    if (typeof order === "string") {
      order = order.trim();
      let m = order.match(/\s+(A|DE)SC$/i);
      if (m) {
        order = order.replace(/\s+(A|DE)SC/i, "");
      }
      m = (m && m[0].trim()) || "asc";
      if (this.modelInstance.filters.includes(order)) {
        queryInstance.orderBy(order.trim(), m);
      } else {
        throw TypeError(`the ${order} is not listed in your filters`);
      }
    } else if (Array.isArray(order)) {
      order.forEach(element => {
        this.applyOrder(queryInstance, { order: element });
      });
    } else if (typeof order === "object" && order.hasOwnProperty("column")) {
      let orderColumn = order.column;
      if (order.order) {
        orderColumn += ` ${order.order}`;
      }
      this.applyOrder(queryInstance, { order: orderColumn });
    }
  }

  parseFilter(filter) {
    if (filter) {
      try {
        filter = JSON.parse(filter);
      } catch (error) {}
    }
    return filter;
  }
}

module.exports = QueryFilter;