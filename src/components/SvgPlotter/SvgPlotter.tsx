import React from 'react';

export default class SvgPlotter extends React.Component <any> {
    componentDidMount() {
        console.log(this.props);
        const {command} = this.props;
        this.parseAndRunSvgPlotterCommand(command.split("\n"));
    }

    render() {
      return (
        <div>
            <svg id="polygon" width="250" height="250">
            </svg>
            <svg id="circle" width="250" height="250">
            </svg>
            <svg id="rectangle" width="250" height="250">
            </svg>
        </div>
      );
    }
    
    parseAndRunSvgPlotterCommand(lines: any) {
        let points = [];
        let svgns = "http://www.w3.org/2000/svg";
        let svg;

        for (let i = 0; i < lines.length; i++) {
          let line = lines[i];
          console.log('line', line)
          points = line.split(' ');
  
          switch(line[0]?.toUpperCase()) {
            case 'C':
                console.log('drawing circle', points, this.props);
                svg = document.getElementById('circle') as any;
                var shape = document.createElementNS(svgns, "circle");
                shape.setAttributeNS(null, "cx", points[1]);
                shape.setAttributeNS(null, "cy", points[2]);
                shape.setAttributeNS(null, "r",  points[3]);
                shape.setAttributeNS(null, 'fill', '#'+Math.round(0xffffff * Math.random()).toString(16));
                svg.appendChild(shape);
              break;
  
            case 'P':
                console.log('drawing Polygon', points, this.props);
                svg = document.getElementById('polygon') as any;
                let ppoints = points.splice(1).join(" ").split(",").join(",");
                let polygon = document.createElementNS(svgns, 'polygon');
                polygon.setAttributeNS(null, 'points', ppoints.trim());
                polygon.setAttributeNS(null, 'fill', '#'+Math.round(0xffffff * Math.random()).toString(16));
                svg.appendChild(polygon);
              break;
  
            case 'R':
                console.log('drawing Rectangle', points, this.props);
                svg = document.getElementById('rectangle') as any;
                let rect = document.createElementNS(svgns, 'rect');
                rect.setAttributeNS(null, 'x', points[1]);
                rect.setAttributeNS(null, 'y', points[2]);
                rect.setAttributeNS(null, 'height', points[3]);
                rect.setAttributeNS(null, 'width', points[4]);
                rect.setAttributeNS(null, 'fill', '#'+Math.round(0xffffff * Math.random()).toString(16));
                svg.appendChild(rect);
              break;
  
            default:
                console.log('Sorry we don\'t recognize the shape/command');
          }
        }
      }
}

