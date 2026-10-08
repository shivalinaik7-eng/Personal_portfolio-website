module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'Shivali',
          email: 'admin@portfolio.com',
          password: 'admin123',
          createdAt: now,
          updatedAt: now
        }
      ]
    );

    await queryInterface.bulkInsert(
      'projects',
      [
        {
          userId: 1,
          title: 'Digital Notice Board',
          description:
            'A web-based digital notice board for creating and displaying college notices.',
          technologies:
            'HTML, CSS, JavaScript, Express, MySQL',
          category: 'Full Stack',
          githubLink:
            'https://github.com/',
          demoLink:
            'https://example.com/',
          createdAt: now,
          updatedAt: now
        },
        {
          userId: 1,
          title: 'MedScript',
          description:
            'A healthcare application concept for organizing prescription and medicine information.',
          technologies:
            'React, Express, MySQL, OCR',
          category: 'Web Application',
          githubLink:
            'https://github.com/',
          demoLink:
            'https://example.com/',
          createdAt: now,
          updatedAt: now
        },
        {
          userId: 1,
          title: 'Portfolio Website',
          description:
            'A dynamic personal portfolio website built with React, Express, Sequelize and MySQL.',
          technologies:
            'React, Express, Sequelize, MySQL',
          category: 'Portfolio',
          githubLink:
            'https://github.com/',
          demoLink:
            'https://example.com/',
          createdAt: now,
          updatedAt: now
        }
      ]
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'projects',
      null,
      {}
    );

    await queryInterface.bulkDelete(
      'users',
      null,
      {}
    );
  }
};