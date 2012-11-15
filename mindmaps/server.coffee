fs =require('fs')
connect = require('connect')
connect()
.use((req, res, next)->
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

	next()
)
.use('/src',connect.static(__dirname + '/src'))
.use('/bin',connect.static(__dirname + '/bin'))
.use(connect.bodyParser())
.use('/upload',(req,res)->
	# fs.writeFileSync('maps/' + req.body.name, req.body.data)
	fs.writeFileSync('maps/' + 'map', req.body.data)
	res.end()
)
.use('/get', (req,res)->
	data = fs.readFileSync('maps/' + 'map')
	res.end(data)
)
.use('/getMaps',(req,res)->
	files = fs.readdirSync('maps')
	res.end(JSON.stringify(files))
)
.listen(8000)

console.log('superwolf')