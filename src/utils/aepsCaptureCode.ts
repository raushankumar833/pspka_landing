import $ from 'jquery';
const GetCustomDomName = '127.0.0.1';
const primaryUrl = 'http://' + GetCustomDomName + ':';

type SuccessCallback = (info: any) => void;
type FailedCallback = (error: any) => void;

type SuccessCallbackLoad = (data: any[]) => void;
type FailedCallbackLoad = (error: any) => void;

type SuccessCallbackCFP = (message: string, data: any) => void;
type FailedCallbackCFP = (error: any) => void;

type SuccessCallbackCFPA2 = (message: string, data: any) => void;
type FailedCallbackCFPA2 = (error: any) => void;

type SuccessCallbackT = (message: string, data: any) => void;
type FailedCallbackT = (error: any) => void;

export const getMFS100Info = (onSuccess: SuccessCallback, onFailed: FailedCallback): any =>{
  // KeyFlag = ""; // Assuming KeyFlag is defined elsewhere or commented out intentionally
  return GetMFS100Client('info', onSuccess, onFailed);
}


export const  captureFinger = ( rdport: string,
    onSuccess: SuccessCallback,
    onFailed: FailedCallback) =>{
        return PostMFS100Client('capture', rdport, onSuccess, onFailed);
}

export const captureFingerAeps2 = (  rdport: string,
    onSuccess: SuccessCallback,
    onFailed: FailedCallback) =>{
    return PostMFS100ClientAeps2('capture', rdport, onSuccess, onFailed);
}


export const captureFingerTest = ( 
     rdport: string,
    onSuccess: SuccessCallback,
    onFailed: FailedCallback) => {
 return PostMFS100ClientTest('capture', rdport, onSuccess, onFailed);
}




function PostMFS100Client(
  method: string,
  rdport: string,
  onSuccess: SuccessCallback,
  onFailed: FailedCallback
): void {
  let res: any;
  const XML =
    '<PidOptions ver="1.0"><Opts fCount="1" fType="2" format="0" pidVer="2.0" timeout="30000" otp="" posh="UNKNOWN" env="P" /></PidOptions>';
  $.support.cors = true;
  let httpStatus = false;
  $.ajax({
    type: 'CAPTURE',
    async: onSuccess !== undefined, // Determine if async based on whether onSuccess is provided
    crossDomain: true,
    url: primaryUrl + rdport + '/rd/' + method,
    data: XML,
    dataType: 'text',
    processData: false,
    success: function (data) {
      httpStatus = true;
      res = { httpStatus: httpStatus, data: data };
      if (onSuccess) onSuccess(res);
    },
    error: function (jqXHR, ajaxOptions, thrownError) {
      if (onFailed) onFailed(thrownError);
    },
  });
}

function PostMFS100ClientAeps2(
  method: string,
  rdport: string,
  onSuccess: SuccessCallback,
  onFailed: FailedCallback
): void {
  let res: any;
  const XML =
    '<PidOptions ver="1.0"><Opts env="P" fCount="1" fType="2" iCount="0" format="0" pCount="0" pidVer="2.0" timeout="15000" wadh="E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=" posh="UNKNOWN" /></PidOptions>';
  $.support.cors = true;
  let httpStatus = false;
  $.ajax({
    type: 'CAPTURE',
    async: onSuccess !== undefined, // Determine if async based on whether onSuccess is provided
    crossDomain: true,
    url: primaryUrl + rdport + '/rd/' + method,
    data: XML,
    dataType: 'text',
    processData: false,
    success: function (data) {
      httpStatus = true;
      res = { httpStatus: httpStatus, data: data };
      if (onSuccess) onSuccess(res);
    },
    error: function (jqXHR, ajaxOptions, thrownError) {
      if (onFailed) onFailed(thrownError);
    },
  });
}

function PostMFS100ClientTest(
  method: string,
  rdport: string,
  onSuccess: SuccessCallback,
  onFailed: FailedCallback
): void {
  let res: any;
  const XML = `<?xml version="1.0"?>
  <PidOptions ver="1.0">
    <Opts fCount="1" fType="2" iCount="0" pCount="0" pgCount="2" format="0" pidVer="2.0" timeout="10000" pTimeout="20000" wadh="TF/lfPuh1n4ZY1xizYpqikIBm+gv65r51MFNek4uwNw=" posh="UNKNOWN" env="P" />
    <CustOpts>
      <Param name="mantrakey" value="" />
    </CustOpts>
  </PidOptions>`;
  $.support.cors = true;
  let httpStatus = false;
  $.ajax({
    type: 'CAPTURE',
    async: onSuccess !== undefined, // Determine if async based on whether onSuccess is provided
    crossDomain: true,
    url: `${primaryUrl}${rdport}/rd/${method}`,
    data: XML,
    dataType: 'text',
    processData: false,
    success: function (data) {
      httpStatus = true;
      res = { httpStatus: httpStatus, data: data };
      if (onSuccess) onSuccess(res);
    },
    error: function (jqXHR, ajaxOptions, thrownError) {
      if (onFailed) onFailed(thrownError);
    },
  });
}

async function GetMFS100Client(
  method: string,
  onSuccess: (result: any[]) => void,
  onFailed: (error: string) => void
) {
  $.support.cors = true;
  new Promise<any>((resolve, reject) => {
    const dataRes: any[] = [];
    const httpStatus = false;
    for (let i = 11100; i < 11103; i++) {
      $.ajax({
        type: 'MYNTRA',
        // type: 'RDSERVICE',
        async: false,
        url: primaryUrl + i.toString(),
        dataType: 'text',
        processData: false,
        cache: false,
        crossDomain: true,
        success: function (data) {
          dataRes.push({ httpStatus: true, data: data, port: i });
          // console.log(
          //   `GetMFS100Client => ${i} :` + JSON.stringify(data, null, 2)
          // );
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
          if (i === 8005) {
            i = 11099;
          }
          if (!httpStatus && i === 11103) {
            //console.log("GetMFS100Client Error => " + thrownError);
          }
        },
      });
    }
    if (dataRes && dataRes.length > 0) {
      resolve(dataRes);
    } else {
      reject('No Driver Found');
    }
  })
    .then((result) => {
      if (onSuccess) onSuccess(result);
    })
    .catch((error) => {
      if (onFailed) onFailed(error);
    });
}

export const getMFS100InfoLoad = ( setMachineRequest: (value: boolean) => void,
onSuccess: SuccessCallbackLoad,
onFailed: FailedCallbackLoad): void =>{
    setMachineRequest(true);
    try {
      getMFS100Info(
        (res) => {
          let htmlData = '';
          let RdSer = false;
          const dataArray: any[] = [];
          for (const k in res) {
            if (res.hasOwnProperty(k)) {
              const $doc = $.parseXML(res[k].data);
              htmlData +=
                '<p><input type="radio" checked="checked" name="rdport" value="' +
                k +
                '">  ' +
                $($doc).find('RDService').attr('info') +
                ' (' +
                $($doc).find('RDService').attr('status') +
                ')</p>';
              const data = {
                rdport: res[k].port,
                info: $($doc).find('RDService').attr('info'),
                status: $($doc).find('RDService').attr('status'),
              };
  
              if ($($doc).find('RDService').attr('status') === 'READY') {
                RdSer = true;
                dataArray.push(data);
              } else if ($($doc).find('RDService').attr('status') === 'NOTREADY') {
                dataArray.push(data);
              }
            }
          }
          if (dataArray.length > 0) {
            console.log('loop finished success=> ', Object.keys(res).length);
            setMachineRequest(false);
            onSuccess(dataArray);
          } else {
            console.log('loop finished failed=> ', Object.keys(res).length);
            setMachineRequest(false);
            onSuccess(dataArray);
          }
        },
        (error) => {
          setMachineRequest(false);
          console.log('machine not detected');
          onFailed(error);
        }
      );
    } catch (error) {
      console.log('An error occurred:', error);
      setMachineRequest(false);
      onFailed(error);
    }
}



export const captureFingerPrint = (rdport: string,
    onSuccess: SuccessCallbackCFP,
    onFailed: FailedCallbackCFP):void =>{
        setTimeout(() => {
            captureFinger(
              rdport,
              (res) => {
                if (res.httpStatus) {
                  const $doc = $.parseXML(res.data);
                  const score = parseInt($($doc).find('PidData').find('Resp').attr('qScore') || '0');
        
                  let quality = '';
                  if (score < 41) {
                    quality = 'Poor';
                  } else if (score > 40 && score < 56) {
                    quality = 'Average';
                  } else if (score > 55 && score < 70) {
                    quality = 'Good';
                  } else {
                    quality = 'Very Good';
                  }
        
                  if (score > 0) {
                    const data = {
                      score: score,
                      quality: quality,
                      type: $($doc).find('PidData').find('Data').attr('type'),
                      pidData: $($doc).find('PidData').find('Data').text(),
                      cI: $($doc).find('PidData').find('Skey').attr('ci'),
                      dC: $($doc).find('PidData').find('DeviceInfo').attr('dc'),
                      dpId: $($doc).find('PidData').find('DeviceInfo').attr('dpId'),
                      errInfo: $($doc).find('PidData').find('Resp').attr('errInfo'),
                      fCount: $($doc).find('PidData').find('Resp').attr('fCount'),
                      hMac: $($doc).find('PidData').find('Hmac').text(),
                      mC: $($doc).find('PidData').find('DeviceInfo').attr('mc'),
                      mI: $($doc).find('PidData').find('DeviceInfo').attr('mi'),
                      nmPoints: $($doc).find('PidData').find('Resp').attr('nmPoints'),
                      pidDataType: $($doc).find('PidData').find('Data').attr('type'),
                      qScore: $($doc).find('PidData').find('Resp').attr('qScore'),
                      rdsId: $($doc).find('PidData').find('DeviceInfo').attr('rdsId'),
                      rdsVer: $($doc).find('PidData').find('DeviceInfo').attr('rdsVer'),
                      sessionKey: $($doc).find('PidData').find('Skey').text(),
                      srno: $($doc)
                        .find('PidData')
                        .find('DeviceInfo')
                        .find('additional_info')
                        .find('Param')
                        .eq(0)
                        .attr('value'),
                      sysId: $($doc)
                        .find('PidData')
                        .find('DeviceInfo')
                        .find('additional_info')
                        .find('Param')
                        .eq(1)
                        .attr('value'),
                    };
                    onSuccess('Quality: ' + score + '% ' + quality, data);
                  } else {
                    onFailed($($doc).find('PidData').find('Resp').attr('errInfo'));
                  }
                }
              },
              (err) => {
                onFailed(err);
              }
            );
          }, 100);
}


export const captureFingerPrintAeps2 = ( rdport: string,
    onSuccess: SuccessCallbackCFPA2,
    onFailed: FailedCallbackCFPA2):void =>{
        setTimeout(() => {
            captureFingerAeps2(
              rdport,
              (res) => {
                if (res.httpStatus) {
                  const $doc = $.parseXML(res.data);
                  const score = parseInt($($doc).find('PidData').find('Resp').attr('qScore') || '0');
        
                  let quality = '';
                  if (score < 41) {
                    quality = 'Poor';
                  } else if (score > 40 && score < 56) {
                    quality = 'Average';
                  } else if (score > 55 && score < 70) {
                    quality = 'Good';
                  } else {
                    quality = 'Very Good';
                  }
        
                  if (score > 0) {
                    const paramSr = $($doc)
                      .find('PidData')
                      .find('DeviceInfo')
                      .find('additional_info')
                      .find('Param')[0];
                    const sysId = $($doc)
                      .find('PidData')
                      .find('DeviceInfo')
                      .find('additional_info')
                      .find('Param')[1];
                    const data = {
                      score: score,
                      quality: quality,
                      type: $($doc).find('PidData').find('Data').attr('type'),
                      pidData: $($doc).find('PidData').find('Data').text(),
                      cI: $($doc).find('PidData').find('Skey').attr('ci'),
                      dC: $($doc).find('PidData').find('DeviceInfo').attr('dc'),
                      dpId: $($doc).find('PidData').find('DeviceInfo').attr('dpId'),
                      errInfo: $($doc).find('PidData').find('Resp').attr('errInfo'),
                      fCount: $($doc).find('PidData').find('Resp').attr('fCount'),
                      hMac: $($doc).find('PidData').find('Hmac').text(),
                      mC: $($doc).find('PidData').find('DeviceInfo').attr('mc'),
                      mI: $($doc).find('PidData').find('DeviceInfo').attr('mi'),
                      nmPoints: $($doc).find('PidData').find('Resp').attr('nmPoints'),
                      pidDataType: $($doc).find('PidData').find('Data').attr('type'),
                      qScore: $($doc).find('PidData').find('Resp').attr('qScore'),
                      rdsId: $($doc).find('PidData').find('DeviceInfo').attr('rdsId'),
                      rdsVer: $($doc).find('PidData').find('DeviceInfo').attr('rdsVer'),
                      sessionKey: $($doc).find('PidData').find('Skey').text(),
                      srno: $(paramSr).attr('value'),
                      sysId: $(sysId).attr('value'),
                    };
                    onSuccess('Quality: ' + score + '% ' + quality, data);
                  } else {
                    onFailed($($doc).find('PidData').find('Resp').attr('errInfo'));
                  }
                }
              },
              (err) => {
                onFailed(err);
              }
            );
          }, 100);
}



export const captureFingerPrintTest = (rdport: string,
    onSuccess: SuccessCallbackT,
    onFailed: FailedCallbackT):void =>{

        setTimeout(() => {
            captureFingerTest(
              rdport,
              (res) => {
                if (res.httpStatus) {
                  const $doc = $.parseXML(res.data);
                  const score = parseInt($($doc).find('PidData').find('Resp').attr('qScore') || '0');
        
                  let quality = '';
                  if (score < 41) {
                    quality = 'Poor';
                  } else if (score > 40 && score < 56) {
                    quality = 'Average';
                  } else if (score > 55 && score < 70) {
                    quality = 'Good';
                  } else {
                    quality = 'Very Good';
                  }
        
                  if (score > 0) {
                    const paramSr = $($doc)
                      .find('PidData')
                      .find('DeviceInfo')
                      .find('additional_info')
                      .find('Param')[0];
                    const sysId = $($doc)
                      .find('PidData')
                      .find('DeviceInfo')
                      .find('additional_info')
                      .find('Param')[1];
                    const data = {
                      score: score,
                      quality: quality,
                      type: $($doc).find('PidData').find('Data').attr('type'),
                      pidData: $($doc).find('PidData').find('Data').text(),
                      cI: $($doc).find('PidData').find('Skey').attr('ci'),
                      dC: $($doc).find('PidData').find('DeviceInfo').attr('dc'),
                      dpId: $($doc).find('PidData').find('DeviceInfo').attr('dpId'),
                      errInfo: $($doc).find('PidData').find('Resp').attr('errInfo'),
                      fCount: $($doc).find('PidData').find('Resp').attr('fCount'),
                      hMac: $($doc).find('PidData').find('Hmac').text(),
                      mC: $($doc).find('PidData').find('DeviceInfo').attr('mc'),
                      mI: $($doc).find('PidData').find('DeviceInfo').attr('mi'),
                      nmPoints: $($doc).find('PidData').find('Resp').attr('nmPoints'),
                      pidDataType: $($doc).find('PidData').find('Data').attr('type'),
                      qScore: $($doc).find('PidData').find('Resp').attr('qScore'),
                      rdsId: $($doc).find('PidData').find('DeviceInfo').attr('rdsId'),
                      rdsVer: $($doc).find('PidData').find('DeviceInfo').attr('rdsVer'),
                      sessionKey: $($doc).find('PidData').find('Skey').text(),
                      srno: $(paramSr).attr('value'),
                      sysId: $(sysId).attr('value'),
                    };
                    onSuccess('Quality: ' + score + '% ' + quality, data);
                  } else {
                    onFailed($($doc).find('PidData').find('Resp').attr('errInfo'));
                  }
                }
              },
              (err) => {
                onFailed(err);
              }
            );
          }, 100);
}


