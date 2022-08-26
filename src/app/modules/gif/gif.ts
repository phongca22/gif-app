import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Rating } from './rating.enum';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export class User {
  name: string;
  username: string;
  avatar: string;
  constructor(data: any) {
    this.name = data?.display_name;
    this.username = data?.username;
    this.avatar = data?.avatar_url;
  }
}

export class Image {
  preview: string;

  constructor(data: any) {
    this.preview = data.preview_webp.url;
  }
}

export class Gif {
  id: string;
  title: string;
  rating: Rating;
  user: User;
  image: Image;
  timeAgo: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.rating = data.rating;
    this.user = new User(data.user);
    this.image = new Image(data.images);
    try {
      this.timeAgo = timeAgo.format(new Date(data.trending_datetime));
    } catch (e) {
      this.timeAgo = 'Unknown';
    }
  }
}
