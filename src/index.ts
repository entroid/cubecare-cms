// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }/*: { strapi: Core.Strapi } */) {
    // Seed only if no categories exist yet
    const existingCount = await strapi.entityService.count('api::category.category');
    if (existingCount > 0) return;

    // Create top-level categories
    const curtains = await strapi.entityService.create('api::category.category', {
      data: {
        name: 'Cubicle Curtains / Privacy',
        slug: 'cubicle-curtains-privacy',
        publishedAt: new Date(),
      },
    });

    const tracks = await strapi.entityService.create('api::category.category', {
      data: {
        name: 'Cubicle Curtain Tracks',
        slug: 'cubicle-curtain-tracks',
        publishedAt: new Date(),
      },
    });

    const bedding = await strapi.entityService.create('api::category.category', {
      data: {
        name: 'Bedding',
        slug: 'bedding',
        publishedAt: new Date(),
      },
    });

    // Create subcategories
    const disposable = await strapi.entityService.create('api::category.category', {
      data: {
        name: 'Disposable Curtains',
        slug: 'disposable-curtains',
        parent: curtains.id,
        publishedAt: new Date(),
      },
    });

    const classic = await strapi.entityService.create('api::category.category', {
      data: {
        name: 'Classic Track',
        slug: 'classic-track',
        parent: tracks.id,
        publishedAt: new Date(),
      },
    });

    const miniCube = await strapi.entityService.create('api::category.category', {
      data: {
        name: 'Mini Cube Track Accessories',
        slug: 'mini-cube-track-accessories',
        parent: tracks.id,
        publishedAt: new Date(),
      },
    });

    // Seed products
    await strapi.entityService.create('api::product.product', {
      data: {
        name: '518 Disposable Curtains – IN BLOOM 100″',
        slug: '518-disposable-curtains-in-bloom',
        shortDescription: 'Disposable cubicle curtain with antimicrobial finish.',
        description:
          'IN BLOOM disposable curtain with 100″ drop. Designed for easy installation and replacement.',
        category: disposable.id,
        specifications: {
          width: '100 inches',
          material: 'Polypropylene non-woven fabric',
          finish: 'Antimicrobial',
          application: 'Healthcare cubicle privacy',
        },
        publishedAt: new Date(),
      },
    });

    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Classic Track End Cap',
        slug: 'classic-track-end-cap',
        shortDescription: 'End cap accessory for Classic Curtain Track System.',
        description:
          'Durable aluminum end cap fitting designed for the Classic track series.',
        category: classic.id,
        specifications: {
          material: 'Aluminum',
          color: 'Silver',
          compatibility: 'Classic Track System',
        },
        publishedAt: new Date(),
      },
    });

    await strapi.entityService.create('api::product.product', {
      data: {
        name: 'Mini Cube Track Bend 45°',
        slug: 'mini-cube-track-bend-45',
        shortDescription: '45-degree corner bend for Mini Cube Track.',
        description:
          'Precision molded bend to fit Mini Cube curtain track systems, ensuring smooth glide and flexibility.',
        category: miniCube.id,
        specifications: {
          angle: '45°',
          material: 'PVC',
          color: 'White',
        },
        publishedAt: new Date(),
      },
    });
  },
};
