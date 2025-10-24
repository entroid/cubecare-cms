import type { Schema, Struct } from '@strapi/strapi';

export interface VariantVariant extends Struct.ComponentSchema {
  collectionName: 'components_variant_variant';
  info: {
    description: 'Product variation (e.g., width, color, size)';
    displayName: 'Variant';
  };
  attributes: {
    additionalPrice: Schema.Attribute.Decimal;
    attributes: Schema.Attribute.JSON;
    available: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    images: Schema.Attribute.Media<undefined, true>;
    sku: Schema.Attribute.String;
    variantName: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'variant.variant': VariantVariant;
    }
  }
}
