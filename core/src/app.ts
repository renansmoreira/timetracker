import express from 'express'
const app = express()
const port = 3000

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.post('/timer', (_req, res) => {
  const timer = new Timer();
  timer.start();
  timerService.save(timer);

  res.send({
    id: timer.id,
    _links: {
      self: {
        href: ''
      }
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
