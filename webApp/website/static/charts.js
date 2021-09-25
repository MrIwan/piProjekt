'use strict'

class gaugeChart
{
    constructor(title, chartDom)
    {
        this.chartCpu = echarts.init(chartDom);
        this.option = {
            title: {
                left: 'center',
                top: '70%',
                text: title
            },
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
              {
                name: title + ' usage',
                type: 'gauge',
                progress: {
                  show: true
                },
                detail: {
                  valueAnimation: true,
                  formatter: '{value}%'
                },
                data: [
                  {
                    value: 50,
                    name: 'usage'
                  }
                ]
              }
            ]
          };
        
        this.option && this.chartCpu.setOption(this.option);
    }
    add_data(d)
    {
        this.option['series'][0]['data'][0]['value'] = d;
        this.chartCpu.setOption(this.option)
    }
    
}