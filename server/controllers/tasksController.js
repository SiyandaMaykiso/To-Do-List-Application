const pool = require('../db');

exports.createTask = async (req, res) => {
    const { title, description, userId } = req.body;
    try {
        const newTask = await pool.query(
            'INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *',
            [title, description, userId]
        );
        res.json(newTask.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const allTasks = await pool.query('SELECT * FROM tasks');
        res.json(allTasks.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (task.rows.length === 0) {
            return res.status(404).send('Task not found');
        }
        res.json(task.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { iscomplete } = req.body;

    try {
        const updatedTask = await pool.query(
            'UPDATE tasks SET iscomplete = $1 WHERE id = $2 RETURNING *',
            [iscomplete, id]
        );
        if (updatedTask.rows.length === 0) {
            return res.status(404).send('Task not found');
        }
        res.json(updatedTask.rows[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Server error');
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteOp = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        if (deleteOp.rowCount === 0) {
            return res.status(404).send('Task not found');
        }
        res.status(204).send('Task deleted successfully');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Server error');
    }
};
