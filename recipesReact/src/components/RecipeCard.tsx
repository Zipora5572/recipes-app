import { Card, CardContent, Typography, ListItemButton, List, ListItemText, useTheme } from '@mui/material';
import { AccessAlarm, EmojiFoodBeverage, LocalDining, CheckCircle, Description, Assignment } from '@mui/icons-material';
import { primaryColor } from '../theme/theme';

const RecipeCard = ({ recipe }: { recipe: any }) => {
  const theme = useTheme();
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        borderColor: primaryColor,
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: '12px',
        boxShadow: theme.shadows[5],
        backgroundColor: '#ffffff',
        padding: '16px',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '&::-moz-scrollbar': {
          display: 'none',
        }
      }}
    >
      <CardContent>
       
        <Typography variant="h4" component="div" sx={{ color: primaryColor, fontWeight: 'bold', textAlign: 'center' }}>
          <EmojiFoodBeverage sx={{ verticalAlign: 'middle', marginRight: '8px' }} />
          {recipe.title}
          
        </Typography>
        <Typography variant="h6" component="div" sx={{ marginTop: '8px', color: theme.palette.text.secondary }}>
          <AccessAlarm sx={{ verticalAlign: 'middle', marginRight: '4px' }} />
          Cooking Time: {recipe.cookingTime ?? 10} minutes
        </Typography>
        
        <Typography variant="h6" component="div" sx={{ marginTop: '16px', color: primaryColor, borderBottom: '2px solid #ff5722', paddingBottom: '4px' }}>
          <Description sx={{ verticalAlign: 'middle', marginRight: '4px' }} />
          Description
        </Typography>

        <Typography variant="body1" sx={{ color: theme.palette.text.primary, marginBottom: '16px' }}>
          {recipe.description}
        </Typography>
        
        <Typography variant="h6" component="div" sx={{ marginTop: '16px', color: primaryColor, borderBottom: '2px solid #ff5722', paddingBottom: '4px' }}>
          <LocalDining sx={{ verticalAlign: 'middle', marginRight: '4px',paddingBottom: '4px' }} />
          Ingredients
        </Typography>
        <List>
          {(recipe.ingredients || []).map((ingredient: string, index: number) => (
            <ListItemButton key={index} sx={{ backgroundColor: 'transparent', borderRadius: '4px', margin: '4px 0', '&:hover': { backgroundColor: '#ffe0e0' } }}>
              <CheckCircle sx={{ color: primaryColor, marginRight: '8px' }} />
              <ListItemText primary={ingredient} sx={{ color: theme.palette.text.primary }} />
            </ListItemButton>
          ))}
        </List>
        
        <Typography variant="h6" component="div" sx={{ marginTop: '16px', color: primaryColor, borderBottom: '2px solid #ff5722', paddingBottom: '4px' }}>
          <Assignment sx={{ verticalAlign: 'middle', marginRight: '4px' }} />
          Instructions
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
          {recipe.instructions}
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
