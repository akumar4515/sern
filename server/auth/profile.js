import pool from '../index.js';

const Profile= async (req, res) => {
  const client = await pool.connect();
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM aman1 WHERE ID=$1';
    const value = [id];

    const result = await client.query(query, value);

    if (result.rows.length > 0) {
      const userData = result.rows[0];
      res.status(200).json({ status: 200, user: userData });
    } else {
      res.status(404).json({ status: 404, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  } finally {
    client.release();
  }
};

export default Profile;
