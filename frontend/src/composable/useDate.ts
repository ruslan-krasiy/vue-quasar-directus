const useDate = (val: string):string => {
  const date = (new Date(val)).getTime();
  const current = (new Date()).getTime();

  const time = current - date;

  const years = Math.floor((time/(1000 * 60 * 60 * 24 * 365)))
  const days = Math.floor( time/(1000*60*60*24) % 365)
  const hours = Math.floor( (time/(1000*60*60)) % 24 )
  const minutes = Math.floor( (time/1000/60) % 60 )

  const dd = days > 0 ? `${days} day${days > 1 ? 's' : ''}` : null;
  const yy = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : null;
  const hh = hours > 0 ? `${hours} h` : null;
  const mm = minutes > 0 ? `${minutes} min${minutes > 1 ? 's': ''}` : null;

  if(yy){
    return `${yy} ${dd} ago`
  }else if(dd){
    return `${dd} ago`
  }else if(hh){
    return `${hh} ${mm} ago`;
  }else if(mm){
    return `${mm} ago`;
  }else{
    return 'just now';
  }
}

export default useDate;
