"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[386],{2028:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>d,toc:()=>u});var r=i(4512),s=i(3250);const t={slug:"/features/registration",label:"Features",sidebar_position:1},a="Registrierung",d={unversionedId:"features/registration",id:"features/registration",title:"Registrierung",description:"F\xfcr die Validierung der Daten im Formular der Registrierung wird clientseitig zod verwendet.",source:"@site/src/features/registration.mdx",sourceDirName:"features",slug:"/features/registration",permalink:"/sse/en/features/registration",draft:!1,unlisted:!1,editUrl:"https://github.com/clemenscodes/sse/edit/main/apps/notes/docs/src/features/registration.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{slug:"/features/registration",label:"Features",sidebar_position:1},sidebar:"defaultSidebar",previous:{title:"Features",permalink:"/sse/en/features"},next:{title:"Anmeldung",permalink:"/sse/en/features/login"}},l={},u=[{value:"Datenvalidierung",id:"datenvalidierung",level:2},{value:"Clientseitige Validierung",id:"clientseitige-validierung",level:3},{value:"Benutzername",id:"benutzername",level:4},{value:"Email",id:"email",level:4},{value:"Passwort",id:"passwort",level:4},{value:"Serverseitige Validierung",id:"serverseitige-validierung",level:3},{value:"Erstellung des neuen Benutzers",id:"erstellung-des-neuen-benutzers",level:2}];function c(e){const n=Object.assign({h1:"h1",p:"p",h2:"h2",h3:"h3",h4:"h4",ul:"ul",li:"li"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"registrierung",children:"Registrierung"}),"\n",(0,r.jsx)(n.p,{children:"F\xfcr die Validierung der Daten im Formular der Registrierung wird clientseitig zod verwendet.\nZod ist eine Biblithek um Datenstrukturen mit Hilfe von TypeScript zu definieren und zu validieren.\nEs wird sichergestellt, dass die \xfcbergebenen Daten genau dem vorher definierten Datenformat entsprechen.\nWenn die Daten invalide sind, ist das Formular in einem fehlerhaften Zustand,\ndie Fehlermeldung wird im Client angezeigt und es nicht m\xf6glich \xfcber die Benutzeroberfl\xe4che das Formular abzuschicken."}),"\n",(0,r.jsx)(n.h2,{id:"datenvalidierung",children:"Datenvalidierung"}),"\n",(0,r.jsx)(n.p,{children:"F\xfcr die Registrierung ist die Eingabe eines Benutzernamens, einer E-Mail sowie des Passworts notwendig."}),"\n",(0,r.jsx)(n.p,{children:"Diese Eingaben unterliegen folgenden Einschr\xe4nkungen:"}),"\n",(0,r.jsx)(n.h3,{id:"clientseitige-validierung",children:"Clientseitige Validierung"}),"\n",(0,r.jsx)(n.h4,{id:"benutzername",children:"Benutzername"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Muss zwischen 2 und 20 Zeichen sein"}),"\n",(0,r.jsx)(n.li,{children:"Darf nur Gro\xdf,- und Kleinbuchstaben enthalten"}),"\n",(0,r.jsx)(n.li,{children:"Darf nur Zahlen von 0 bis 9 enthalten"}),"\n",(0,r.jsx)(n.li,{children:"Das einzig erlaubte Sonderzeichen ist ein Unterstrich"}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"email",children:"Email"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Muss eine g\xfcltige E-Mail sein"}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"passwort",children:"Passwort"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Muss mindestens 8 Zeichen enthalten"}),"\n",(0,r.jsx)(n.li,{children:"Muss mindestens einen kleinen Buchstaben enthalten"}),"\n",(0,r.jsx)(n.li,{children:"Muss mindestens einen gro\xdfen Buchstaben enthalten"}),"\n",(0,r.jsx)(n.li,{children:"Muss mindestens eine Zahl enthalten"}),"\n",(0,r.jsx)(n.li,{children:"Muss mindestens ein Sonderzeichen enthalten"}),"\n",(0,r.jsx)(n.li,{children:"Muss die \xdcberpr\xfcfung von zxcvbn-ts \xfcberstehen und den maximalen Sicherheitswert 4/4 erreichen"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Logischerweise muss das Passwort bei der Registrierung auch best\xe4tigt werden und miteinander \xfcbereinstimmen."}),"\n",(0,r.jsx)(n.p,{children:"Treffen all diese Bedingungen zu, kann das Formular an das Backend abgeschickt werden."}),"\n",(0,r.jsx)(n.h3,{id:"serverseitige-validierung",children:"Serverseitige Validierung"}),"\n",(0,r.jsx)(n.p,{children:"Auch serverseitig werden die Daten mit Hilfe von zod validiert. Die Regeln sind dabei die selben wie clientseitig.\nWird versucht \xfcber reine HTTP-Anfragen invalide Daten direkt an das Backend zu senden,\nerh\xe4lt man einen Statuscode von 406 und eine Erl\xe4uterung welche Datenformate erwartet wurden und warum die gesendeten Daten ung\xfcltig sind."}),"\n",(0,r.jsx)(n.h2,{id:"erstellung-des-neuen-benutzers",children:"Erstellung des neuen Benutzers"}),"\n",(0,r.jsx)(n.p,{children:"Da sichergestellt wurde, dass die Daten dem erwarteten Datenformat entsprechen, kann nun mit Hilfe von Prisma ein neuer Nutzer angelegt werden."}),"\n",(0,r.jsx)(n.p,{children:"Das Passwort befindet sich aktuell noch im Klartext und muss sicher gehasht werden.\nDaf\xfcr wird die argon2 Bibliothek verwendet. Zun\xe4chst wird aus einer Umgebungsvariable ein Secret ausgelesen.\nDanach werden zuf\xe4llig 128 Bits generiert mit Hilfe der in Node.js eingebauten Methode randomBytes.\nDiese zuf\xe4lligen Bytes dienen nun als Salt.\nZus\xe4tzlich aus dem Salt und dem sicher ausgelesenen Secret wird dann mit HMAC und dem SHA-512 Hashverfahren ein Secret generiert,\ndas dann bei Argon2 dem vorher generierten Salt verwendet wird, um das Passwort zu hashen.\nDieses Verfahren macht es unm\xf6glich die Passw\xf6rter der Benutzer zu Bruteforcen, selbst bei Wissen \xfcber das Verwendete Hashverfahren."}),"\n",(0,r.jsx)(n.p,{children:"Somit sind die Benutzeraccounts sicher."}),"\n",(0,r.jsx)(n.p,{children:"Nach der Erstellung des Benutzers ist die Registrierung erfolgt und man wird automatisch eingeloggt durch das Loginverfahren."})]})}const h=function(e={}){const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(c,e)})):c(e)}},3250:(e,n,i)=>{i.d(n,{Zo:()=>d,ah:()=>t});var r=i(2735);const s=r.createContext({});function t(e){const n=r.useContext(s);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function d({components:e,children:n,disableParentContext:i}){let d;return d=i?"function"==typeof e?e({}):e||a:t(e),r.createElement(s.Provider,{value:d},n)}}}]);