/*
░█████╗░░█████╗░██████╗░██████╗░░█████╗░░░░░░░███╗░░░███╗██████╗░
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗░░░░░░████╗░████║██╔══██╗
██║░░╚═╝██║░░██║██████╦╝██████╔╝███████║█████╗██╔████╔██║██║░░██║
██║░░██╗██║░░██║██╔══██╗██╔══██╗██╔══██║╚════╝██║╚██╔╝██║██║░░██║
╚█████╔╝╚█████╔╝██████╦╝██║░░██║██║░░██║░░░░░░██║░╚═╝░██║██████╔╝
░╚════╝░░╚════╝░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░░░░╚═╝░░░░░╚═╝╚═════╝░ BY SISULA WELGAMAGE

Coded By  Sisula welgamage | 2022/08/08 Main Release | Docker Image : sisula/whatsapp_bot | Host: AWS(Heroku) OR etc. | Terminal: Node 
*/
var Jimp = require('jimp');
__path = process.cwd()

async function gen_fuel_pass(qr_code_dir, name, plate, f_type){
if (name === '' | name === ' ') return await console.log('Error : Empty string [Sisula Bug Report]\n\nrestarting fuelpass template server...');
if (name.length >= 25) return await console.log('Error : Please Use 25 or less characters [Sisula Bug Report]\n\nrestarting fuelpass template server...');

const font_dir = './assets/font/font_2.fnt'
const bg_dir = './assets/media_template/Background.jpg'
const qr_dir = qr_code_dir
Jimp.read(bg_dir, (err, fir_img) => {
        if(err) {
            console.log('Error [Sisula Bug Report]: ', err);
        } else {
            Jimp.read(qr_dir, (err, sec_img) => {
                if(err) {
                    console.log('Error [Sisula Bug Report]: ',err);
                } else {
                        fir_img.resize(720, 480);
                        sec_img.resize(264, 312);
                        fir_img.blit(sec_img, 15, 142);
                    Jimp.loadFont(font_dir).then(function (font) {
                        fir_img.print(font, 290, 210, 'Name : ' + name);
                        fir_img.print(font, 290, 250, 'Plate No : ' + plate);
                        fir_img.print(font, 290, 290, 'Fuel Type : ' + f_type);
                        fir_img.writeAsync(__path + '/tmp/fuel_gen_pass_qr.png');
                    })
                    
                }
            })
        }
    });
}


module.exports = {gen_fuel_pass}

