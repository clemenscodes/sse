"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[929],{6881:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>t,metadata:()=>d,toc:()=>u});var r=s(4512),i=s(3250);const t={slug:"/features/password-reset",label:"Features",sidebar_position:3},a="Passwort vergessen",d={unversionedId:"features/password-reset",id:"features/password-reset",title:"Passwort vergessen",description:"- Wurde das Passwort vergessen, kann man in ein Formular eine E-Mail eingeben",source:"@site/src/features/password-reset.mdx",sourceDirName:"features",slug:"/features/password-reset",permalink:"/sse/en/features/password-reset",draft:!1,unlisted:!1,editUrl:"https://github.com/clemenscodes/sse/edit/main/apps/notes/docs/src/features/password-reset.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{slug:"/features/password-reset",label:"Features",sidebar_position:3},sidebar:"defaultSidebar",previous:{title:"Anmeldung",permalink:"/sse/en/features/login"},next:{title:"Autorisierung",permalink:"/sse/en/features/auth"}},l={},u=[];function o(e){const n=Object.assign({h1:"h1",ul:"ul",li:"li"},(0,i.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"passwort-vergessen",children:"Passwort vergessen"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Wurde das Passwort vergessen, kann man in ein Formular eine E-Mail eingeben"}),"\n",(0,r.jsx)(n.li,{children:"Auch dieses Formular ist mit zod abgesichert"}),"\n",(0,r.jsx)(n.li,{children:"Hierbei gibt es keinerlei Informationen dar\xfcber, ob die E-Mail zum Benutzer geh\xf6rt oder nicht,\nob eine E-Mail gesendet werden konnte, zum Zur\xfccksetzen des Passworts, oder nicht"}),"\n",(0,r.jsx)(n.li,{children:"Existiert die E-Mail f\xfcr einen Benutzer in der Datenbank, wird eine neue UUIDv4 generiert und mit dem Benutzer assoziiert"}),"\n",(0,r.jsx)(n.li,{children:"Falls nicht, wird still ohne Fehlermeldung die Funktion beendet"}),"\n",(0,r.jsx)(n.li,{children:"Die generierte UUIDv4 ist f\xfcr nur f\xfcnf Minuten g\xfcltig"}),"\n",(0,r.jsx)(n.li,{children:"Die E-Mail wird auf dem Server mit Hilfe von nodemailer versendet"}),"\n",(0,r.jsx)(n.li,{children:"Der SMTP-Transporter ist Mailhog"}),"\n",(0,r.jsx)(n.li,{children:"Das E-Mail Postfach ist auf dem Port 8025 erreichbar"}),"\n",(0,r.jsx)(n.li,{children:"Die E-Mail, die an die eingebene E-Mail Adresse im Erfolgsfall gesendet wurde, enth\xe4lt nun einen Link mit der UUIDv4"}),"\n",(0,r.jsx)(n.li,{children:"Somit kann nur der Benutzer, dem die E-Mail geh\xf6rt und auf der Seite angemeldet ist, die Seite aufrufen"}),"\n",(0,r.jsx)(n.li,{children:"Auf der aufgerufenen Seite befindet sich ein Formular zur Eingabe des neuen Passworts und zum Best\xe4tigen"}),"\n",(0,r.jsx)(n.li,{children:"Auch hier wird wie gewohnt mit zod validiert und sichergestellt, dass das Passwort sicher ist"}),"\n",(0,r.jsx)(n.li,{children:"Sendet man das Formular erfolgreich ab, wird das Passwort f\xfcr den Benutzer nun ge\xe4ndert\nund stets das Passwortabsicherungsverfahren verwendet, das bereits in der Registrierung verwendet wurde"}),"\n",(0,r.jsx)(n.li,{children:"Im Erfolgsfall wird man nun auf die Anmeldeseite weitergeleitet und man kann sich mit dem neuen Passwort anmelden"}),"\n"]})]})}const c=function(e={}){const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(o,e)})):o(e)}},3250:(e,n,s)=>{s.d(n,{Zo:()=>d,ah:()=>t});var r=s(2735);const i=r.createContext({});function t(e){const n=r.useContext(i);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function d({components:e,children:n,disableParentContext:s}){let d;return d=s?"function"==typeof e?e({}):e||a:t(e),r.createElement(i.Provider,{value:d},n)}}}]);