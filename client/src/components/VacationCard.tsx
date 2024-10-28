import React from 'react';



import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';



import { Vacation } from '../redux/vacationSlice';



import { useTranslation } from 'react-i18next';







interface VacationCardProps {



  vacation: Vacation;



  onFollow: (id: number) => void;



  onUnfollow: (id: number) => void;



  isFollowing: boolean;



  isAdmin: boolean;



}







const VacationCard: React.FC<VacationCardProps> = ({ vacation, onFollow, onUnfollow, isFollowing, isAdmin }) => {



  const { t } = useTranslation();



  return (



    <Card>



      <CardMedia



        component="img"



        height="140"



        image={vacation.image}



        alt={vacation.destination}



      />



      <CardContent>



        <Typography gutterBottom variant="h5" component="div">



          {vacation.destination}



        </Typography>



        <Typography variant="body2" color="text.secondary">



          {vacation.description}



        </Typography>



        <Typography variant="body2">



          {t('startDate')}: {vacation.startDate}



        </Typography>



        <Typography variant="body2">



          {t('endDate')}: {vacation.endDate}



        </Typography>



        <Typography variant="body2">



          {t('price')}: ${vacation.price}



        </Typography>



        {!isAdmin && (



          <Box mt={2}>



            {isFollowing ? (



              <Button variant="outlined" color="primary" onClick={() => onUnfollow(vacation.id)}>



                {t('unfollow')}



              </Button>



            ) : (



              <Button variant="contained" color="primary" onClick={() => onFollow(vacation.id)}>



                {t('follow')}



              </Button>



            )}



          </Box>



        )}



      </CardContent>



    </Card>



  );



};







export default VacationCard;








