import React from 'react';
import SvgPlotter from './components/SvgPlotter/SvgPlotter';
import './App.css';

export default class App extends React.Component {
  state = {
    showSvg: false
  };

  points: string[] = [];

  svgCommand = `Enter SVG plotter command in the below format:- 
  R <X Coordinate> <Y Coordinate> <Width> <Height> - Should Draw a rectangle with the parameters marked onto the SVG
  C <CX Coordinate> <CY Coordinate> <Radius> - Should Draw a circle with the parameters marked onto the SVG
  P <X1,Y1> <X2,Y2> <X3,Y3> ..... <Xn,Yn> - Should draw a polygon onto the SVG with the points specified`;

  render() {
      return (
        <div className="App">
          <textarea onChange={this.captureCommand.bind(this)} 
          placeholder={this.svgCommand} rows={10} cols={100} />
          <div>
            <button onClick={this.drawSvg.bind(this)}>Plot SVG</button>
          </div>
          {this.state.showSvg && <SvgPlotter command={this.svgCommand}/>}
        </div>
      );
    }

    captureCommand(event: any) {
      this.svgCommand = (event?.target?.value);
      this.setState({showSvg: false});
    }


    drawSvg() {
      this.setState({showSvg: true});
    }
}

