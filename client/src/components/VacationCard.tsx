import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../providers/AuthProvider';
import { Vacation } from '../types/vacation';
import { useFollowVacationMutation, useUnfollowVacationMutation } from '../redux/vacationApi';
import logger from '../utils/logger';

interface Props {
  vacation: Vacation;
  onEdit?: (vacation: Vacation) => void;
  onDelete?: (id: number) => void;
}

const VacationCard: React.FC<Props> = ({ vacation, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const { isAdmin, user } = useAuth();
  const [followVacation] = useFollowVacationMutation();
  const [unfollowVacation] = useUnfollowVacationMutation();

  const handleFollowToggle = async () => {
    try {
      if (vacation.is_followed) {
        await unfollowVacation(vacation.id);
      } else {
        await followVacation(vacation.id);
      }
    } catch (error) {
      logger.error('שגיאה בפעולת המעקב:', error);
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={vacation.image_url || '/placeholder.jpg'}
        alt={vacation.destination}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {vacation.destination}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {vacation.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            {t('vacation.start_date')}: {new Date(vacation.start_date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            {t('vacation.end_date')}: {new Date(vacation.end_date).toLocaleDateString()}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            ${vacation.price}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {!isAdmin && user && (
          <IconButton onClick={handleFollowToggle} color="primary">
            {vacation.is_followed ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <Typography variant="body2" sx={{ ml: 1 }}>
              {vacation.followers_count}
            </Typography>
          </IconButton>
        )}
        {isAdmin && (
          <Box>
            <Tooltip title={t('common.edit')}>
              <IconButton onClick={() => onEdit?.(vacation)} color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('common.delete')}>
              <IconButton onClick={() => onDelete?.(vacation.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default VacationCard;


















