import React from 'react';
import ImageApp from './ImageApp';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
      <AppBar color="secondary" position="fixed">
        <Container
          maxWidth="lg"
        >
          <Toolbar>
            <Typography
              component="h1"
              variant="h4"
            >
              Art & Media App
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        maxWidth="lg"
      >
        <ImageApp />
      </Container>
    </div>
  );
}

export default App;