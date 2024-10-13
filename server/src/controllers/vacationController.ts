import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import pool from '../db';
import Vacation from '../models/vacation';

// כאן נוסיף את הלוגיקה לטיפול בחופשות

export const getAllVacations = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await pool.query<Vacation[]>(
      'SELECT * FROM vacations LIMIT ? OFFSET ?',
      [limit, offset]
    );
    const [countResult] = await pool.query('SELECT COUNT(*) as count FROM vacations');
    const totalCount = (countResult as any)[0].count;

    res.json({
      vacations: rows,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount
    });
  } catch (error) {
    console.error('שגיאה בקבלת החופשות:', error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};

export const createVacation = async (req: Request, res: Response) => {
  const { description, destination, image, startDate, endDate, price } = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO vacations (description, destination, image, startDate, endDate, price, followersCount) VALUES (?, ?, ?, ?, ?, ?, 0)',
      [description, destination, image, startDate, endDate, price]
    );
    res.status(201).json({ id: result.insertId, ...req.body, followersCount: 0 });
  } catch (error) {
    console.error('שגיאה ביצירת חופשה:', error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};

export const updateVacation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, destination, image, startDate, endDate, price } = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE vacations SET description = ?, destination = ?, image = ?, startDate = ?, endDate = ?, price = ? WHERE id = ?',
      [description, destination, image, startDate, endDate, price, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'חופשה לא נמצאה' });
    } else {
      res.json({ id, ...req.body });
    }
  } catch (error) {
    console.error('שגיאה בעדכון חופשה:', error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};

export const deleteVacation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM vacations WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'חופשה לא נמצאה' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error('שגיאה במחיקת חופשה:', error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};

export const followVacation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE vacations SET followersCount = followersCount + 1 WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'חופשה לא נמצאה' });
    } else {
      res.json({ message: 'עקיבה אחרי החופשה עודכנה בהצלחה' });
    }
  } catch (error) {
    console.error('שגיאה בעדכון עקיבה אחרי חופשה:', error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};
