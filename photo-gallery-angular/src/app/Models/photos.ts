// export class Photos {
//   id: string;

//   name: string;
//   caption: string;
// }

export default class Photos {
  constructor (
    public image: File,
    public caption: string,
  ) {}

}
