'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Galaxy S10',
          image_url:
            'https://i-cdn.phonearena.com/images/article/115410-two_lead/Latest-Galaxy-S10-sales-report-is-music-to-Samsungs-ears-amid-Galaxy-Fold-controversy.jpg',
          price: 7000000,
          stock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'XZ Premium',
          image_url:
            'https://zdnet3.cbsistatic.com/hub/i/r/2017/07/12/2ae473a1-37fa-48c9-a40d-c60295c55321/thumbnail/770x433/5b3786893e74467be0fb07a2583eb9e7/sony-xperia-xz-premium-header.jpg',
          price: 6000000,
          stock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Iphone S7',
          image_url: 'https://images.macrumors.com/article-new/2015/02/iphone7lineup.jpg',
          price: 5000000,
          stock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Galaxy S10',
          image_url:
            'https://i-cdn.phonearena.com/images/article/115410-two_lead/Latest-Galaxy-S10-sales-report-is-music-to-Samsungs-ears-amid-Galaxy-Fold-controversy.jpg',
          price: 7000000,
          stock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'XZ Premium',
          image_url:
            'https://zdnet3.cbsistatic.com/hub/i/r/2017/07/12/2ae473a1-37fa-48c9-a40d-c60295c55321/thumbnail/770x433/5b3786893e74467be0fb07a2583eb9e7/sony-xperia-xz-premium-header.jpg',
          price: 6000000,
          stock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Iphone S7',
          image_url: 'https://images.macrumors.com/article-new/2015/02/iphone7lineup.jpg',
          price: 5000000,
          stock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Galaxy S10',
          image_url:
            'https://i-cdn.phonearena.com/images/article/115410-two_lead/Latest-Galaxy-S10-sales-report-is-music-to-Samsungs-ears-amid-Galaxy-Fold-controversy.jpg',
          price: 7000000,
          stock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'XZ Premium',
          image_url:
            'https://zdnet3.cbsistatic.com/hub/i/r/2017/07/12/2ae473a1-37fa-48c9-a40d-c60295c55321/thumbnail/770x433/5b3786893e74467be0fb07a2583eb9e7/sony-xperia-xz-premium-header.jpg',
          price: 6000000,
          stock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Iphone S7',
          image_url: 'https://images.macrumors.com/article-new/2015/02/iphone7lineup.jpg',
          price: 5000000,
          stock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },
};
