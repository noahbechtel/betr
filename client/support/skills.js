const compare = (a, b) => {
  if (a.pri > b.pri) return 1
  if (b.pri > a.pri) return -1

  return 0
}

export const skills = [
  { name: 'JavaScript', prof: 'Highly Proficient', type: 'Language', pri: 1 },
  { name: 'React', prof: 'Highly Proficient', type: 'FrameWork', pri: 1 },
  { name: 'Redux', prof: 'Highly Proficient', type: 'Data Delivery', pri: 1 },
  { name: 'CSS ', prof: 'Highly Proficient', type: 'Html Styles', pri: 1 },
  {
    name: 'Sequelize',
    prof: 'Highly Proficient',
    type: 'Database Framework',
    pri: 1
  },
  {
    name: 'Node',
    prof: 'Highly Proficient',
    type: 'Run-time Environment',
    pri: 1
  },
  { name: 'Git', prof: 'Highly Proficient', type: 'Version Control', pri: 2 },

  { name: 'UNIX', prof: 'Proficient', type: 'Operating System', pri: 3 },
  {
    name: 'OAuth',
    prof: 'Proficient',
    type: 'Open Source Authorization',
    pri: 2
  },
  { name: 'Express', prof: 'Proficient', type: 'Content Delivery', pri: 2 },
  { name: 'Canvas', prof: 'Proficient', type: 'Web Graphics', pri: 1 },
  { name: 'PIXI', prof: 'Proficient', type: 'Web Graphics', pri: 2 },
  { name: 'FireBase', prof: 'Proficient', type: 'No-Sequel Database', pri: 2 },
  { name: 'Babel', prof: 'Proficient', type: 'Content Delivery', pri: 3 },
  { name: 'Adobe PS', prof: 'Proficient', type: 'Media Creation', pri: 3 },

  { name: 'Python', prof: 'Competent', type: 'Language', pri: 2 },
  { name: 'GreenSock', prof: 'Competent', type: 'Animation Library', pri: 3 },
  { name: 'PICO-8', prof: 'Competent', type: 'Game Creation', pri: 3 }
].sort(compare)
