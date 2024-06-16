const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = [
    { username: 'sei9ys4u', password: '$2b$12$.k5HkglClr2iZE22YFw97.9XtvoeAMQSdhKNwwHG.xlNG6Hyk2ClG', role: 'customer' },
    { username: '9giu16l0', password: '$2b$12$rboYsna/rHo055kw3f6Nmu3hbBZirVmRm2XgjnaCYsW8qk0VsiKJ.', role: 'customer' },
    { username: 'tp58v9ss', password: '$2b$12$kCkkUVh3W6FY28VMcIB7ru5CWYelwGWuXbEumnXrBKhSc82UJcEqi', role: 'customer' },
    { username: 'yjqo7i76', password: '$2b$12$.QM9KtMeRkk5Xuqhdom8l.kaHpy2sLv25rG2ZmUqC/erBfZuDRvrG', role: 'customer' },
    { username: 'j4q7y5u5', password: '$2b$12$1e6NAmDbz6E.XKOTWMjTuexJk0H81YviHDm9RMwX5xFlcM6HMn5xW', role: 'customer' },
    { username: 'jdsac9jo', password: '$2b$12$.hzAA1.DG.O.0y4shuu7guOs/s6Xl3Mz2RvLRZTh28I62OJE.kn/W', role: 'customer' },
    { username: '15zv2ufm', password: '$2b$12$eINmPd8yhJGV4E23CVYVbec/ouLTCskefUTQU2b8/FHp3SxPl7lPO', role: 'customer' },
    { username: '6l3qfkzq', password: '$2b$12$ZT3Y9j7oCvWgXXf2982qCegJkSfESbO9b1UbBiP5Vnz3DGzOTOTYy', role: 'customer' },
    { username: '3y1hybjp', password: '$2b$12$46aEsHLKchykLuBeiBnKn.JGGsHNjgadxSwp2zoXok7lljeQ7oGu6', role: 'customer' },
    { username: '75hgusyf', password: '$2b$12$QONnFymxl6XQKoWg9UZOhuepZkRqn699ydhoDaSUGN7wJYH5tTYDm', role: 'customer' },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Users added successfully');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
