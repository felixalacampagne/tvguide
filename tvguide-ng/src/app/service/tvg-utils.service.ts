import { Injectable } from '@angular/core';
import { Channel } from '../model/channel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TvgUtilsService {

   private days : string[] = [
      "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
   ];


  // Could maybe populate this from the STB?
  // Could maybe use enum?
   private channels : Channel[] = [
      new Channel("BBC 1 SE", "BBC1SEHD"),
      new Channel("BBC 2", "BBC2HD"),
      new Channel("BBC 3", "BBC3HD"),
      new Channel("BBC 4", "BBC4HD"),
      new Channel("Channel 4 HD", "C4HD"),
      new Channel("ITV 1", "ITV1HD"),
      new Channel("ITV 2", "ITV2HD"),
      new Channel("ITV 3", "ITV3HD"),
      new Channel("ITV 4", "ITV4HD")
    // , new Channel("", ""),
   ];

   private serverhost : string;
   private tvgurlpfx : string = '';
   constructor() {
      this.serverhost = window.location.origin;
      this.tvgurlpfx = this.serverhost + environment.tvgpath
   }

   public getDays() : string[]
   {
      return this.days;
   }

   public getChannels() : Channel[]
   {
      return this.channels;
   }

   public getPageURL(day : string, channel : Channel) : string
   {
      // Is there a printf for typescript??
      return this.tvgurlpfx + channel.code + "_" + day + ".html";
   }

   public addDay(day : string, dir : number) : string
   {
      let i : number = this.days.findIndex(d => (d == day));
      if(i < 0)
      {
         i = 0;
      }
      else
      {
         if(dir > 0)
         {
            i++;
            if(i >= this.days.length)
            {
               i = 0;
            }
         }
         else
         {
            i--;
            if( i < 0)
            {
               i = this.days.length - 1;
            }
         }
      }
      return this.days[i];
   }

   public addChannel(chan : Channel, dir : number) : Channel
   {
      let i : number = this.channels.findIndex(c => (c.code == chan.code));
      if(i < 0)
      {
         i = 0;
      }
      else
      {
         if(dir > 0)
         {
            i++;
            if(i >= this.channels.length)
            {
               i = 0;
            }
         }
         else
         {
            i--;
            if( i < 0)
            {
               i = this.channels.length - 1;
            }
         }
      }
      return this.channels[i];
   }
}
