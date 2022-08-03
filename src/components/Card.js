// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function HotelCard(records) {
    console.log("RECORDSSS")
    console.log(records)
    return (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
            be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
            </Typography>
            <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
        </Card>
    );
}


// export default function HotelCard(records) {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image={records[2]}
//         alt="hotel picture"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {records[0]}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {records[1]}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }