const puppeteer = require('puppeteer');
const readline = require('readline');

console.log('Lancement du programme')

async function readLine() {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(resolve => {

        rl.question('Avec quel service avez vous des problèmes ? ', (answer) => {
          rl.close();
          resolve(answer)
        });
    })
}

async function readLine2() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {

      rl.question('Voulez vous déclarer un soucis avec ce service ? (Y ou N)', (answer) => {
        rl.close();
        resolve(answer)
      });
  })
}

async function readLine3() {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise(resolve => {
  
        rl.question('Quel est votre problème ?', (answer) => {
          rl.close();
          resolve(answer)
        });
    })
  }

(async () => {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage();

    await page.goto('https://downdetector.fr');
    console.log('Page chargée !')
    await page.click('[id="_evidon-banner-acceptbutton"]');
    await page.click('[class="form-control search-query p-4 rounded-8"]');

    const service = await readLine();

    await page.keyboard.type(service);
    await page.keyboard.press('Enter');
    await page.waitForNavigation()
    const reponse = await page.$eval('#company > div.card.card-body.px-2.px-md-4.pt-3.pb-4.mb-3.mr-lg-n3 > div:nth-child(1) > div.h2.entry-title', el => el.textContent);
    console.log(reponse)

    const souci = await readLine2();

    if (souci == "Y", "y"){
        await page.click('[class="btn btn-danger mt-2 px-4 py-3 shadow mb-2 btn-submit-problem"]');
        await page.click('#other-option > a', '.elements');
        await page.click('[class="form-control col-5"]');
        const souci2 = await readLine3();
        page.keyboard.type(souci2);
        await page.click('[class="btn btn-danger px-3 py-2"]')
        await console.log('Votre problème a été déclaré !')
    }
    else{
        return
    }
})()