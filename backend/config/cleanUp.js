const cron=require('node-cron');
const User=require('../models/user.Model.Js');

cron.schedule('*/5 * * * *',async () => {

    try {
        console.log('Running cleanup task for unverified users');
           const now = Date.now();

           const result=await User.deleteMany({
              isVerified: false,
            //   createdAt: { $lt: now - 24 * 60 * 60 * 1000 } // 1 day
           });

           if(result.deleteCount>0)
           {
               console.log(`Deleted ${result.deleteCount} unverified users`);
           }

    } catch (error) {
        console.error('Error occurred while cleaning up unverified users:', error);
    }
});

module.exports=cron;