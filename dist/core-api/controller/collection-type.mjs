import { isObject } from "lodash/fp";
import { errors } from "@strapi/utils";
import { parseBody } from "./transform.mjs";
const createCollectionTypeController = ({
  contentType
}) => {
  const uid = contentType.uid;
  return {
    /**
     * Retrieve records.
     */
    async find(ctx) {
      await this.validateQuery(ctx);
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      const { results, pagination } = await strapi.service(uid).find(sanitizedQuery);
      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      return this.transformResponse(sanitizedResults, { pagination });
    },
    /**
     * Retrieve a record.
     *
     * @return {Object}
     */
    async findOne(ctx) {
      const { id } = ctx.params;
      await this.validateQuery(ctx);
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      const entity = await strapi.service(uid).findOne(id, sanitizedQuery);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
    /**
     * Create a record.
     *
     * @return {Object}
     */
    async create(ctx) {
      await this.validateQuery(ctx);
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      const body = parseBody(ctx);
      if (!isObject(body.data)) {
        throw new errors.ValidationError('Missing "data" payload in the request body');
      }
      const sanitizedInputData = await this.sanitizeInput(body.data, ctx);
      const entity = await strapi.service(uid).create({
        ...sanitizedQuery,
        data: sanitizedInputData,
        files: "files" in body ? body.files : void 0
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
    /**
     * Update a record.
     *
     * @return {Object}
     */
    async update(ctx) {
      const { id } = ctx.params;
      await this.validateQuery(ctx);
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      const body = parseBody(ctx);
      if (!isObject(body.data)) {
        throw new errors.ValidationError('Missing "data" payload in the request body');
      }
      const sanitizedInputData = await this.sanitizeInput(body.data, ctx);
      const entity = await strapi.service(uid).update(id, {
        ...sanitizedQuery,
        data: sanitizedInputData,
        files: "files" in body ? body.files : void 0
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
    /**
     * Destroy a record.
     *
     * @return {Object}
     */
    async delete(ctx) {
      const { id } = ctx.params;
      await this.validateQuery(ctx);
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      const entity = await strapi.service(uid).delete(id, sanitizedQuery);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    }
  };
};
export {
  createCollectionTypeController as default
};
//# sourceMappingURL=collection-type.mjs.map
