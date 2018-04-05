import React from 'react';
import MoreInfo from './MoreInfo.jsx';
import {CONCLUSSION_TEXTS} from '../constants/constants';
import {UI, TIPS} from '../config/config';


export default class Feedback extends React.Component {
  constructor(props){
    super(props);
    this.state = {show_tip: false, tip_to_show: ""}
   }
   componentWillReceiveProps(nextProps){
     if(nextProps.show_tip===true && this.props.show_tip===false){
       //recently changed to true -> generate random tip and save it
       this.setState({show_tip: true, tip_to_show: TIPS[Math.floor(Math.random()*TIPS.length)]});
     }
     if(nextProps.show_tip===false && this.props.show_tip===true){
       this.setState({show_tip:false})
     }
   }
   render(){
     let text, level;
     if(this.props.conclussion===4){
       text = "la contraseña introducida es fuerte";
       level = "secure";
     } else if(this.props.conclussion===3 || this.props.conclussion===2){
       text = "la contraseña introducida es media";
       level = "medium";
     } else {
       text = "la contraseña introducida es débil";
       level = "weak";
     }

    const mainBoxStyle = {
      height: 'calc(100vh - 30em)',
      transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }

    let pass_info = (
      <div className="pass_info">
        
        <div className="pass_info_title">información sobre la contraseña introducida: {this.props.hide_pass ? "": <span className="pass_password">{this.props.password}</span>}
        </div>

        <div className="pass_info_body">

          <div className="body_broken_pass">
            <p className="body_broken_pass_title">la contraseña se tardaría en romper:</p>
            <ul>
              <li className="body_broken_pass01"># en un <span className="underline_text">ataque offline</span>: <span className="">{this.props.crack_times_display.offline_slow_hashing_1e4_per_second}</span><div className="underline_text_explanation"><span className="triangle"></span><p>se roba la base de datos de contraseñas y se cotejan para adivinar la que has escrito</p></div></li>
              <li className="body_broken_pass02"># en un ataque online a 10 contraseñas por segundo: <span className="">{this.props.crack_times_display.online_no_throttling_10_per_second}</span></li>
              <li className="body_broken_pass03"># en un ataque online a 100 contraseñas por hora: <span className="">{this.props.crack_times_display.online_throttling_100_per_hour}</span></li>
            </ul>
          </div>
          
          <div className="body_more_info">
            <p className="body_more_info_title">más información:</p>
            <p className="body_more_info_text">
              {this.props.sequence.map((seq, index) => {
                  return (<MoreInfo sequence_size={this.props.sequence.length} seq={seq} index={index} hide_pass={this.props.hide_pass} key={index}/>);
                })}</p>
          </div>

          <div className="body_recommendations">
            <p className="body_recom_title">recomendaciones:</p>
            {this.props.recommendations.map((rec, index) => {return (<p className="body_recom" key={index}>{rec}</p>);
              })}
          </div>

          <div className="body_conclusion">
            <p className="body_conclusion_title">conclusión:</p> 
            <p className="body_conclusion_text">{CONCLUSSION_TEXTS[this.props.conclussion]}</p>
          </div>

          <div className="body_other">
            <p className="body_other_title">otras recomendaciones generales:</p>
            <p className="body_other_text">no utilices palabras del diccionario como contraseñas, a ser posible que su contraseña no contenga su nombre de usuario...</p>
          </div>

        </div>

      </div>
    );

    let main_text;
    if(this.state.show_tip===false){
      main_text = <div className="main_text">{UI.initial_text}</div>
    } else {
      main_text = <div className="main_text tip">{this.state.tip_to_show}</div>;
    }
    return (
      <div>
          <div className={"password_feedback " + level} style={{opacity: (!this.props.show_tip && this.props.password !=="") ? 1 : 0}}>{text}</div>
          <div className={(!this.props.show_tip && this.props.password !=="") ? "main_box with_feedback" : "main_box"}>
              {(this.props.show_tip || this.props.password ==="") ? main_text : pass_info }
          </div>
      </div>
    );
  }
}
