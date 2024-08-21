// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  card:{
    height: 300,
    width: '100%',
    marginBottom: 40,
    
  },
  thumbnail:{
    width: '95%',
    height: '80%',
    alignSelf: 'center',
  },
  video:{
    width: '100%',
    height: '90%',
    alignSelf: 'center',
  },
  titleBox:{
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  title:{
    
    fontSize: 30,
  },
  detailsBox:{
    alignSelf: 'center',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '93%'
  },
  author:{
    color: 'gray',
    fontSize: 12
    
  },
  views:{
    alignSelf: 'flex-end',
    color: 'gray',
    fontSize: 12,
  },
  durationBackground:{
    position: 'relative',
    backgroundColor: 'lightgray',
    alignSelf: 'flex-end',
    height: 15,
    width: 55,
    borderRadius: 5,
    opacity: .85,
    bottom: 25,
    right: 20
  },
  duration:{
    position: 'relative',
     alignSelf: 'center',
     color: 'white'
  },
  detailsBoxPlaying:{
    alignSelf: 'center',
    justifyContent: 'flex-start', 
    width: '93%',
    marginTop: 20
  },
  titleBoxPlaying:{
    justifyContent: 'flex-start',
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  detailsPlaying:{
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold'

  },
  
});

export default styles;
