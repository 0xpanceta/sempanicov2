import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cozyContainer: {
    flex: 1,
    backgroundColor: '#FFF8F0', // Creamy white
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cozyButton: {
    backgroundColor: '#DAA49A', // Soft rust color
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  cozyButtonText: {
    fontSize: 18,
    color: '#FFFFFF', // White text
    fontFamily: 'serif', // This will depend on the fonts you have available
  },
  cozyTitle: {
    fontSize: 22,
    color: '#5C4033', // Warm brown
    fontFamily: 'serif',
    margin: 10,
  },
  cozyText: {
    fontSize: 16,
    color: '#5C4033', // Warm brown
    fontFamily: 'sans-serif', // More casual
    textAlign: 'center',
    lineHeight: 24,
  },
  cozyInput: {
    borderWidth: 1,
    borderColor: '#CCC2B8', // Light grey-brown
    backgroundColor: '#FAF9F6', // Light creamy background
    borderRadius: 8,
    fontSize: 16,
    padding: 15,
    color: '#5C4033', // Text color
    fontFamily: 'sans-serif',
    width: '100%',
  }
});
