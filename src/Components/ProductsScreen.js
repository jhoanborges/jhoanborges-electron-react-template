import React , {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from './CircularProgress';
import styles from './ProductsScreen.css';
//import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


async function getProducts() {
    try {
      let response = await fetch(
        'http://167.71.145.135/api/product',
      );
      let responseJson = await response.json();
      this.setState({
        data: responseJson.data,
      })

      setTimeout( function() { 
        this.setState({
          loading:false
        })
        }.bind(this),1000);
        
      return responseJson.data;
    } catch (error) {
      console.error(error);      
    }

  }

  //const classes = useStyles();

  function ProductList(props) {
    const data = props.data;

    const listItems = data.map((item) =>
    <div  key={item.id.toString()}>
    <ListItem alignItems="flex-start">
    <ListItemAvatar className="image">
      <Avatar alt={item.name} src={"http://167.71.145.135/storage/"+item.images[0].url} className="image-width"/>
    </ListItemAvatar>
    <div>
    <ListItemText
      primary={item.name}
      secondary={
        <React.Fragment>
        {item.plazas.length ? 

          <Typography
            component="span"
            variant="body1"
            className={useStyles.inline}
            color="textPrimary"
          >
          {item.plazas[0].name}
          </Typography>
          :null
        }

          {' - '+item.description.slice(0, 120)+'...'}        
        </React.Fragment>
      }
    />
    
    
    <ListItemText >
  <p  className="price-color"> { new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN'  }).format( item.price) }</p>
  </ListItemText>
  </div>
  </ListItem>

  <Divider variant="inset" />
  </div>
    );
    return (
      <ul>{listItems}</ul>
    );
  }


  class ProductsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading:true
        };
        this.getProducts = getProducts.bind(this);
    }
    
    componentDidMount(){
      this.getProducts()
    }
    
    render(){
      
      return (
      <div>
      {this.state.loading ?
      <CircularProgress></CircularProgress>
      :
        <List className={useStyles.root}>
        <ProductList data={this.state.data}></ProductList>

        </List>
            }
        </div>
      );
    }
}

export default ProductsScreen