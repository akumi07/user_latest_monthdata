const calculation=function(user) {
    customsort = (a, b) => {
        const monthA = a.assessmentMonth.month;
        const monthB = b.assessmentMonth.month;
    
        const yearA = a.assessmentMonth.year;
        const yearB = b.assessmentMonth.year;
        if (yearA < yearB) return 1;
        else if (yearA > yearB) return -1;
        if (monthA < monthB) return 1;
        else if (monthA > monthB) return -1;
        return 0;
      };
      user.sort(customsort);
      const unique_user_name= Array.from(new Set(user.map((item) => item.name)));
    
      const unique_user_data = [];
      for (let i = 0; i < unique_user_name.length; i++) {
        const user_alltime_data = [];
    
        for (let j = 0; j < user.length; j++) {
          if (unique_user_name[i] === user[j].name) {
            user_alltime_data.push({
              name: user[j].name,
              assessmentMonth: user[j].assessmentMonth,
              performance: user[j].performance,
              scorePerCategory: user[j].scorePerCategory
            });
          }
        }
    
        unique_user_data.push({
          name: unique_user_name[i],
          all_month_data: user_alltime_data,
        });
      }
      console.log(unique_user_data[1].all_month_data[0].scorePerCategory);
      const user_improvement_latestmonth = [];
      for (let i = 0; i < unique_user_data.length; i++) {
        const item = unique_user_data[i];
        // console.log(item.all_month_data.length)
        if (item.all_month_data.length <= 1) continue;
        const current_month = item.all_month_data[0].assessmentMonth.month;
        const previous_month = item.all_month_data[1].assessmentMonth.month;
        const current_year = item.all_month_data[0].assessmentMonth.year;
        const previous_year = item.all_month_data[1].assessmentMonth.year;
        const year_diff = current_year - previous_year;
        var diff = current_month - previous_month;
        if (year_diff >= 1) {
    
            diff = 12 - previous_month + current_month + 12 * (year_diff - 1);
        }
        const user_each_months_performance = [];
        let minlen = Math.min(item.all_month_data[0].performance.length, item.all_month_data[1].performance.length)
        for (let k = 0; k < minlen; k++) {
            const net_user_performance = (item.all_month_data[0].performance[k].performance - item.all_month_data[1].performance[k].performance);
            user_each_months_performance.push({
                "movement": item.all_month_data[0].performance[k].movement,
                "improvement": net_user_performance
            });
    
        }
        // console.log(user_each_months_performance);
        user_improvement_latestmonth.push({
            "name": item.all_month_data[0].name,
            "assessmentMonth": {
                "month": item.all_month_data[0].assessmentMonth.month,
                "year": item.all_month_data[0].assessmentMonth.year
            },
    
            "Gap": diff,
            "improvement": user_each_months_performance,
            scorePerCategory: item.all_month_data[0].scorePerCategory

        });
        return user_improvement_latestmonth
    
      }
}
module.exports=calculation
