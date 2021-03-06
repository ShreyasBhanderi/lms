"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = express_1.default();
const port  = process.env.PORT  || 5000;
app.get('/',function(req,res){
    res.send("Welcome");
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', routes_1.default);
app.listen(port,()=>console.log("All is Ok"));
