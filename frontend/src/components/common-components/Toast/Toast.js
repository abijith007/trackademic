import { ShieldX, UserCheck2  } from 'lucide-react';

function Toast({location, type, message}) {  
  let icon;
  switch (type) {
    case 'danger': type = 'alert alert-danger';
                   icon = <ShieldX />
                   break;
    case 'success': type = 'alert alert-success';
                    icon = <UserCheck2/>
                    break;
  }
  return (
    <div className={"p-0 mt-20 toast " + location} style={{display: 'block'}}>
      <div className={"m-0 " + type}>
      {icon}<span className="font-semibold">{message}</span>
      </div>      
    </div>    
  )
}

export default Toast;