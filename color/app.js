const Fastfy = require('fastify')

const fastify = Fastfy({logger: true})

fastify.register(require('@fastify/mysql'), {connectionString: 'mysql://root:ps123@localhost:3309/db_color'})

//get
fastify.get('/get', (request, response) => {
    fastify.mysql.query(
        'SELECT * FROM tb_color',
        function onResult(error, result) {
            response.send(error || result)
        }
    )
})

//get one
fastify.get('/get/:id', (request, response) => {
    fastify.mysql.query(
        `SELECT * FROM tb_color WHERE tb_color.id = '${Number(request.params.id)}'`,
        function onResult(error, result) {
            response.send(error || result)
        }
    )
})

//post
fastify.post('/post', (request, response) => {
    fastify.mysql.query(
        `INSERT INTO tb_color (color, description) VALUES ('${request.body.color}', '${request.body.description}')`,
        function onResult(error, result) {
            return response.send(error || result)
        }
    )
})

//listen///
fastify.listen({port: 8000}, (error, address) => {
    if(error) {
        process.exit()
    }
    console.log(address)
})