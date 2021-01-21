import * as React from 'react'
import RangeSlider from 'react-bootstrap-range-slider';
import Conway from '../classes/Conway';
import * as text404 from '../data/404'
import {ChangeEvent} from "react";
import {FontAwesomeIcon} from '../../../node_modules/@fortawesome/react-fontawesome/index';

interface Conway404Props {
    cellSize?: number
}

interface Conway404State {
    canvasWidth: number
    canvasHeight: number
    cellAlive: number
    controlOpen: boolean
    multiColor: boolean
    underpopulationTrigger: number
    overpopulationTrigger: number
    reproductionTrigger: number
    nbGeneration: number
    playTimeout: NodeJS.Timeout
}

export default class Conway404 extends React.PureComponent<Conway404Props, Conway404State> {
    private cellSize: number;
    private readonly canvasRef: React.MutableRefObject<HTMLCanvasElement>;
    private conway: Conway;

    constructor(props: Conway404Props) {
        super(props)

        this.conway = new Conway();
        this.canvasRef = React.createRef()
        this.cellSize = props.cellSize || 10

        this.state = {
            canvasWidth: 0,
            canvasHeight: 0,
            cellAlive: 0,
            controlOpen: false,
            multiColor: false,
            underpopulationTrigger: this.conway.underpopulationTrigger,
            overpopulationTrigger: this.conway.overpopulationTrigger,
            reproductionTrigger: this.conway.reproductionTrigger,
            nbGeneration: this.conway.nbGeneration,
            playTimeout: undefined
        }
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return <div className="d-flex">
            <div id="conway-container" className="bg-light">
                <canvas ref={this.canvasRef} width={this.state.canvasWidth} height={this.state.canvasHeight}/>
                <div className={"controls p-5 text-light " + (this.state.controlOpen ? 'open' : 'close')}>
                    <div className={"nyancat position-absolute bottom-0 end-0 " + (this.state.multiColor ? 'open' : 'close')}
                         onClick={() => {
                             this.setState({multiColor: !this.state.multiColor})
                         }}/>
                    <div className="position-absolute top-0 end-100 pt-5">
                        <div className="control-btn p-2"
                             onClick={() => {
                                 this.setState({controlOpen: !this.state.controlOpen})
                             }}
                        >
                            {"controles".split('').map((letter: string, key) => <div
                                key={'control-letter' + key}>{letter}</div>)}
                        </div>
                    </div>
                    <div className="position-absolute top-0 end-0 p-5">
                        <a className="btn btn-light me-1"
                           href="/">
                            <FontAwesomeIcon icon="home"/>
                        </a>
                        <div className="btn btn-light me-1"
                             onClick={() => {
                                 this.init()
                             }}>
                            <FontAwesomeIcon icon="retweet"/>
                        </div>
                        {undefined !== this.state.playTimeout && <div className="btn btn-light"
                                                                      onClick={() => {
                                                                          this.pause()
                                                                      }}>
                            <FontAwesomeIcon icon="pause"/>
                        </div>}
                        {undefined === this.state.playTimeout && <div className="btn btn-light"
                                                                      onClick={() => {
                                                                          this.play()
                                                                      }}>
                            <FontAwesomeIcon icon="play"/>
                        </div>}
                    </div>
                    <div className="card bg-dark mb-2 mt-5">
                        <div className="card-body">
                                 <span className="">Toute cellule vivante avec moins
                                 de <strong
                                         className="badge bg-light text-dark">{this.state.underpopulationTrigger}</strong> voisines vivantes meurt de sous-population
                                 </span>
                            <RangeSlider
                                value={this.state.underpopulationTrigger}
                                min={1}
                                max={8}
                                variant={'light'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    this.setState({underpopulationTrigger: parseInt(e.target.value)})
                                }}
                            />
                        </div>
                    </div>
                    <div className="card bg-dark mb-2">
                        <div className="card-body">
                                 <span className="">Toute cellule vivante avec plus
                                 de <strong
                                         className="badge bg-light text-dark">{this.state.overpopulationTrigger}</strong> voisines vivantes meurt de surpopulation
                                 </span>
                            <RangeSlider
                                value={this.state.overpopulationTrigger}
                                min={1}
                                max={8}
                                variant={'light'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    this.setState({overpopulationTrigger: parseInt(e.target.value)})
                                }}
                            />
                        </div>
                    </div>
                    <div className="card bg-dark">
                        <div className="card-body">
                                 <span className="">Toute cellule morte avec exactement <strong
                                     className="badge bg-light text-dark">{this.state.reproductionTrigger}</strong> voisines
                                 vivantes devient une cellule vivante par reproduction
                                 </span>
                            <RangeSlider
                                value={this.state.reproductionTrigger}
                                min={1}
                                max={8}
                                variant={'light'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    this.setState({reproductionTrigger: parseInt(e.target.value)})
                                }}
                            />
                        </div>
                    </div>
                    <div className="h4 mt-5 bg-light text-dark p-2">
                        <div className="d-flex">
                            <div className="flex-grow-1">
                                celules vivantes
                            </div>
                            <div>
                                {("00000" + this.state.cellAlive.toString()).slice(-5)
                                    .split('')
                                    .map((n: string, key) => <span key={"alive-count-" + key}
                                                                   className="bg-dark text-light me-1 p-1 font-helvetica">{n}</span>)}
                            </div>
                        </div>

                    </div>
                    <div className="h4 mt-1 bg-light text-dark p-2">
                        <div className="d-flex">
                            <div className="flex-grow-1">
                                Générations
                            </div>
                            <div>
                                {("00000" + this.state.nbGeneration.toString()).slice(-5)
                                    .split('')
                                    .map((n: string, key) => <span key={"generation-" + key}
                                                                   className="bg-dark text-light me-1 p-1 font-helvetica">{n}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    init() {
        this.pause();
        this.conway = new Conway();
        let canvasRect = this.canvasRef.current.getBoundingClientRect();
        this.setState({
            canvasWidth: canvasRect.width,
            canvasHeight: canvasRect.height
        })
        this.conway.withCellsNumber = Math.ceil(canvasRect.width / this.cellSize);
        this.conway.heightCellsNumber = Math.ceil(canvasRect.height / this.cellSize);
        this.conway.loadFromString(text404.str)
        this.setState({nbGeneration: this.conway.nbGeneration})

        setTimeout(() => {
            this.draw()
        }, 100);

        setTimeout(() => {
            this.play();
        }, 3000)
    }

    newGeneration() {
        this.conway.underpopulationTrigger = this.state.underpopulationTrigger
        this.conway.overpopulationTrigger = this.state.overpopulationTrigger
        this.conway.reproductionTrigger = this.state.reproductionTrigger
        this.conway.newGeneration();
        this.setState({nbGeneration: this.conway.nbGeneration})
        this.draw()
    }

    draw() {
        let cellAlive = 0;
        let ctx = this.canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        ctx.fillStyle = "#212529"
        for (let h in this.conway.model) {
            for (let w in this.conway.model[h]) {
                if (this.conway.model[h][w]) {
                    if (this.state.multiColor) {
                        ctx.fillStyle = this.getRandomColor();
                    }
                    cellAlive++;
                    ctx.fillRect(
                        parseInt(w) * this.cellSize,
                        parseInt(h) * this.cellSize,
                        this.cellSize,
                        this.cellSize
                    );
                }
            }
        }
        this.setState({cellAlive: cellAlive})
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    play() {
        if (undefined === this.state.playTimeout) {
            this.setState({
                playTimeout: setInterval(() => {
                    this.newGeneration()
                }, 100)
            });
        }
    }

    pause() {
        clearInterval(this.state.playTimeout)
        this.setState({playTimeout: undefined})
    }
}
