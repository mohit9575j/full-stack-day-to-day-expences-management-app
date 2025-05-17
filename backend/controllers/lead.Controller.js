
import Expense from '../models/expense.model.js';
import { user as User } from '../models/user.model.js';
import { Sequelize } from 'sequelize';

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboardData = await Expense.findAll({
      attributes: [
        'UserId',
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalExpense']
      ],
      include: [{
        model: User,
        attributes: ['name']  // bring user name only
      }],
      group: ['UserId'],
      order: [[Sequelize.literal('totalExpense'), 'DESC']]
    });

    res.status(200).json({ success: true, leaderboard: leaderboardData });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
// inside catch block
console.error('Leaderboard error:', error);
res.status(500).json({ success: false, message: 'Something went wrong' });

