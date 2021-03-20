import * as React from 'react'
import * as _ from 'lodash';
import {categories, categoryId, SkillsInterface, skills} from '../data/skills'
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome/index';
import { IconProp } from '../../../node_modules/@fortawesome/fontawesome-svg-core/index';

interface SkillsProps {
}

interface SkillsState {
    filter?: categoryId
}

export default class Skills extends React.PureComponent<SkillsProps, SkillsState> {
    private skills: SkillsInterface[] = []
    private categoryClass = new Map<categoryId, string>()
    private categoryIcon = new Map<categoryId, IconProp>()

    constructor(props: SkillsProps) {
        super(props)

        categories.map((item) => {
            this.categoryClass.set(item.id, item.cssClass)
            this.categoryIcon.set(item.id, item.FontAwesomeIcon)
        })


        this.skills = _.shuffle(skills);
        this.state = {
            filter: null
        }
    }

    render() {
        return <div className="mt-5">
            <div className="filters">
                <span className="d-print-none"><FontAwesomeIcon icon="filter" /> filtres : </span>{
                categories.map(item =>
                    <span
                        key={item.id}
                        className={"me-1 mb-1 btn btn-" + item.cssClass}
                        onClick={() => { this.filter(item.id) }}
                    >
                        <FontAwesomeIcon className="me-1" icon={item.FontAwesomeIcon} />
                        {item.displayName}
                    </span>
                )}
                {null !== this.state.filter && <div className="me-1 mb-1 btn btn-danger"
                                           onClick={() => { this.filter(null) }}>
                    <FontAwesomeIcon icon="times-circle" />
                </div>}
            </div>
            <div className="list-skill mt-3">
                {
                    this.skills
                        .filter(item => null === this.state.filter || item.categoryId === this.state.filter)
                        .map((item, idx) =>
                        <span key={"skill - " + idx} className={"me-1 mb-1 btn btn-" + this.categoryClass.get(item.categoryId)}>
                            {item.FontAwesomeIcon && <FontAwesomeIcon className="me-1" icon={item.FontAwesomeIcon} />}
                            {!item.FontAwesomeIcon && this.categoryIcon.get(item.categoryId)
                                && <FontAwesomeIcon className="me-1" icon={this.categoryIcon.get(item.categoryId)} />}
                            {item.displayName}
                        </span>
                    )
                }
            </div>
        </div>
    }

    filter (category?:categoryId) {
        this.setState({...this.state, filter: category})
    }
}
