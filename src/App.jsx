import React, { useEffect, useState } from 'react';
import { Route, Link, useNavigate, Routes, Router, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css'
import DataGrid from 'react-data-grid';
const history = createBrowserHistory();
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const phoneNumber = form.elements.phoneNumber.value;
    const email = form.elements.email.value;

    if (!name || !email || !phoneNumber) {
      alert("Please fill out all the fields");
      return;
    }
    localStorage.setItem('userData', JSON.stringify(formData));
    navigate('/second-page');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          
        />
      </div>
      <button type="submit">Save and Continue</button>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(11, 30),
    margin: theme.spacing(4, 3),
  },
  title: {
    marginBottom: theme.spacing(5),
  },
}));

const SecondPage = function () {
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => {
        alert(err)
      })
  }, []);

  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'body', name: 'Body' },
  ];

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Second Page
      </Typography>
      <DataGrid columns={columns} rows={data.slice(0, 10)} />
    </Paper>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;