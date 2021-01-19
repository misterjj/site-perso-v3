import * as React from 'react'
import Conway from '../classes/Conway';
import * as text404 from '../data/404'

interface Conway404Props {
    cellSize?: number
}

interface Conway404State {
    canvasWidth: number
    canvasHeight: number
}

export default class Conway404 extends React.PureComponent<Conway404Props, Conway404State> {
    private cellSize: number;
    private readonly canvasRef: React.MutableRefObject<HTMLCanvasElement>;
    private conway:Conway;

    constructor(props: Conway404Props) {
        super(props)

        this.conway = new Conway();
        this.canvasRef = React.createRef()
        this.cellSize = props.cellSize || 10

        this.state = {
            canvasWidth: 0,
            canvasHeight: 0
        }
    }

    componentDidMount() {
        let canvasRect = this.canvasRef.current.getBoundingClientRect();
        this.setState({
            canvasWidth: canvasRect.width,
            canvasHeight: canvasRect.height
        })
        this.conway.withCellsNumber = Math.ceil(canvasRect.width / this.cellSize);
        this.conway.heightCellsNumber = Math.ceil(canvasRect.height / this.cellSize);
        // this.conway.withCellsNumber = 3;
        // this.conway.heightCellsNumber = 3;
        this.conway.loadFromString(text404.str)

        setTimeout(() => {this.draw()},100);

        setTimeout(() => {
            setInterval(() => {this.newGeneration()},100);
        }, 3000)
    }

    render() {
        return <div className="d-flex">
            <div id="conway-container" className="bg-light">
                <canvas ref={this.canvasRef} width={this.state.canvasWidth} height={this.state.canvasHeight}/>
            </div>
        </div>
    }

    newGeneration() {
        this.conway.newGeneration();
        this.draw()
    }

    draw() {
        let ctx = this.canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        ctx.fillStyle = "#212529"
        for (let h in this.conway.model) {
            for (let w in this.conway.model[h]) {
                if (this.conway.model[h][w]) {
                    ctx.fillRect(
                        parseInt(w) * this.cellSize,
                        parseInt(h) * this.cellSize,
                        this.cellSize,
                        this.cellSize
                    );
                }
            }
        }
    }
}
