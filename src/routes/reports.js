const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

function formatDateRange(startDate, endDate) {
  return {
    gte: new Date(startDate),
    lte: new Date(endDate),
  };
}

router.get('/generate', async (req, res) => {
  const { startDate, endDate } = req.query;

  console.log(`Fetching sales from ${startDate} to ${endDate}`);

  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: formatDateRange(startDate, endDate),
      },
      include: { branch: true },
    });

    console.log('Sales found:', sales);

    if (sales.length === 0) {
      return res.json({
        totalCustomers: 0,
        totalAmount: 0,
        salesByBranch: {},
      });
    }

    const report = {
      totalCustomers: sales.length,
      totalAmount: sales.reduce((sum, sale) => sum + sale.amount, 0),
      salesByBranch: {},
    };

    sales.forEach((sale) => {
      const branchName = sale.branch.name;
      if (!report.salesByBranch[branchName]) {
        report.salesByBranch[branchName] = {
          totalSales: 0,
          totalAmount: 0,
        };
      }
      report.salesByBranch[branchName].totalSales += 1;
      report.salesByBranch[branchName].totalAmount += sale.amount;
    });

    res.json(report);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).send('Error generating report');
  }
});

module.exports = router;
