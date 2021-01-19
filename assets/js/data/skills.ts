import { IconProp } from '../../../node_modules/@fortawesome/fontawesome-svg-core/index';

export enum categoryId {
   Backend,
   Frontend,
   Tools,
   API

}

export interface categoryInterface {
    id: categoryId
    displayName: string,
    cssClass: string,
    FontAwesomeIcon?: IconProp
}

export interface SkillsInterface {
    categoryId: categoryId
    displayName: string,
    FontAwesomeIcon?: IconProp
}

export const categories: categoryInterface[] = [
    {
        id: categoryId.Backend,
        displayName: 'Backend',
        cssClass: 'primary',
        FontAwesomeIcon: ['fa', 'laptop-code']
    },
    {
        id: categoryId.Frontend,
        displayName: 'Frontend',
        cssClass: 'dark',
        FontAwesomeIcon: ['fa', 'paint-brush']
    },
    {
        id: categoryId.API,
        displayName: 'API',
        cssClass: 'warning',
        FontAwesomeIcon: ['fa', 'cogs']
    },
    {
        id: categoryId.Tools,
        displayName: 'Outils',
        cssClass: 'success',
        FontAwesomeIcon: ['fa', 'wrench']
    },
]

export const skills: SkillsInterface[] = [
    {
        categoryId: categoryId.Backend,
        displayName: 'PHP',
    },
    {
        categoryId: categoryId.Backend,
        displayName: 'Symfony',
        FontAwesomeIcon: ['fab', 'symfony']
    },
    {
        categoryId: categoryId.Backend,
        displayName: 'Redis',
    },
    {
        categoryId: categoryId.Backend,
        displayName: 'Memcached',
    },
    {
        categoryId: categoryId.Backend,
        displayName: 'Elasticsearch',
    },
    {
        categoryId: categoryId.Backend,
        displayName: 'doctrine'
    },
    {
        categoryId: categoryId.Backend,
        displayName: 'oAuth 2'
    },
    {
        categoryId: categoryId.Backend,
        displayName: 'MYSQL',
    },
    {
        categoryId: categoryId.Backend,
        displayName: 'SOLID',
    },
    {
        categoryId: categoryId.Backend,
        displayName: 'bash',
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'Javascript',
        FontAwesomeIcon: ['fab', 'js']
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'typescript',
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'webpack',
        FontAwesomeIcon: ['fab', 'uikit']
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'react',
        FontAwesomeIcon: ['fab', 'react']
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'vueJs',
        FontAwesomeIcon: ['fab', 'vuejs']
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'CSS 3',
        FontAwesomeIcon: ['fab', 'css3-alt']
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'Bootstrap',
        FontAwesomeIcon: ['fab', 'bootstrap']
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'npm',
        FontAwesomeIcon: ['fab', 'npm']
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'Yarn',
        FontAwesomeIcon: ['fab', 'yarn']
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'node',
        FontAwesomeIcon: ['fab', 'node-js']
    },
    {
        categoryId: categoryId.Frontend,
        displayName: 'MJML',
        FontAwesomeIcon: ['fa', 'envelope']
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Amazon Web Service',
        FontAwesomeIcon: ['fab', 'aws']
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Git',
        FontAwesomeIcon: ['fab', 'git']
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Gitlab CI/CD',
        FontAwesomeIcon: ['fab', 'gitlab']
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Rundeck'
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Linux',
        FontAwesomeIcon: ['fab', 'linux']
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Docker',
        FontAwesomeIcon: ['fab', 'docker']
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Kibana'
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Postman'
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'RabbitMQ',
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'PhpStorm',
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Cloudflare',
        FontAwesomeIcon: ['fab', 'cloudflare']
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Confluence',
        FontAwesomeIcon: ['fab', 'confluence']
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Unity',
        FontAwesomeIcon: ['fab', 'unity']
    },
    {
        categoryId: categoryId.Tools,
        displayName: 'Youtrack'
    },
    {
        categoryId: categoryId.API,
        displayName: 'Swagger / open API',
    },
    {
        categoryId: categoryId.API,
        displayName: 'API platform',
    },
    {
        categoryId: categoryId.API,
        displayName: 'REST',
    },
    {
        categoryId: categoryId.API,
        displayName: 'SDK',
    }
]

