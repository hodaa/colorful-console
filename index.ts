
import { styleText } from 'node:util';
import * as http from "node:http";


abstract class ColorConsole{
    abstract log (input:string, res: http.ServerResponse):void
}

class BlueConsole extends ColorConsole
{
    log(input: string, res: http.ServerResponse) {
        res.write(styleText("red", input) + "\n");
        console.log(styleText('blue', input));
    }
}
class RedConsole extends ColorConsole
{
    log (input:string, res: http.ServerResponse) {
        res.write(styleText("red", input));
    }
}
class GreenConsole extends ColorConsole {
  log(input: string,res: http.ServerResponse): void {
    res.write(styleText("green", input));
  }
}

const colorMap = { 
    "red": RedConsole,
    "green": GreenConsole,
    "blue" : BlueConsole
}
function factory(color: string): ColorConsole
{
    const colorObj = colorMap[color as keyof typeof colorMap]
    return new colorObj();
}

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello from my public console!\n");
    const obj = factory("red");
    obj.log("This is a red message", res);
    res.end();
    
}).listen(3000, () => {
    console.log("Server is running at http://0.0.0.0:3000");
});