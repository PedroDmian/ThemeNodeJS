import cron from 'node-cron';

export function cronService() {
  console.log('Run Cron');
  
  //cron.schedule('0 */59 * * * *', () => {
  //  console.log('running a transfers')
  //})
}