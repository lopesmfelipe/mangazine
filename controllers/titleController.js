import Title from './../models/titleModel';

const titles = [
  {
    id: 0,
    title: 'Tokyo Ghoul',
    releaseDate: 2011,
    author: 'Sui Ishida',
  },
  {
    id: 1,
    title: 'Attack on Titan',
    releaseDate: 2009,
    author: 'Hajime Isayama',
  },
  {
    id: 2,
    title: 'Jujutsu Kaisen',
    releaseDate: 2018,
    author: 'Gege Akutami',
  },
];

exports.getAllTitles = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: titles.length,
    data: {
      titles: titles,
    },
  });
};

exports.getTitle = (req, res) => {
  const id = req.params.id * 1;
  const title = titles.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Title not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      title,
    },
  });
};

exports.createTitle = async (req, res) => {
  const { name, author, releaseDate } = req.body;

  const newTitle = await Title.create({
    name,
    author,
    releaseDate,
  });

  res.status(201).json({
    status: 'Success',
    data: {
      title: newTitle,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = titles[titles.length - 1].id + 1;
  const newTitle = Object.assign({ id: newId }, req.body);

  titles.push(newTitle);

  res.status(201).json({
    status: 'success',
    data: {
      title: newTitle,
    },
  });
};

exports.updateTitle = (req, res) => {
  if (req.params.id * 1 >= titles.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      title: '<Updated title placeholder>',
    },
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 >= titles.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
