import { Component } from '@angular/core';
import {CallService} from "../services/call.service";



const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

const constraint = {
  "video": {
    "width": {
      "min": 200,
      "max": 400
    },
    "height": {
      "min": 200,
      "max": 400
    }
  },
  "audio":true
}
export let callService:CallService = new CallService();

@Component({
  selector: 'app-home-callService',
  templateUrl: './home-call.component.html',
  styleUrls: ['./home-call.component.scss']
})
export class HomeCallComponent {

public constructor(public callService:CallService) {
}

  async call() {
    this.callService.resetData();
    let localStream = await navigator.mediaDevices?.getUserMedia(constraint);
    let peerConnection = new RTCPeerConnection(configuration);
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });
    const localVideo = document.querySelector('video#localVideo') as HTMLVideoElement;
    localVideo.srcObject = localStream
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    await this.callService.writeOfferOrAnswerOrIce("offer", offer)
    this.callService.getOfferOrAnswerOrIce("answer", {
      async callBackFn(data: any) {
        if (data) {
          const remoteDesc = new RTCSessionDescription(data);
          await peerConnection.setRemoteDescription(remoteDesc);
        }
      }
    })
    peerConnection.addEventListener('icecandidate', event => {
      if (event.candidate) {
        this.callService.writeOfferOrAnswerOrIce('ice/emit', event.candidate)
      }
    });
    peerConnection.addEventListener('track', event => {
      const remoteVideo = document.querySelector('video#remoteVideo') as HTMLVideoElement;
      let remoteStream = new MediaStream()
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track);
        remoteVideo.srcObject = remoteStream;
      });
    });
    this.callService.getOfferOrAnswerOrIce("ice/receipt", {async callBackFn(data: any) {
        if (data) {
          try {
            await peerConnection.addIceCandidate(data);
          } catch (e) {
            console.error('Error adding received ice candidate 1', e);
          }
        }
      }})
  }

  async takeCall() {
  callService = this.callService;
    const peerConnection = new RTCPeerConnection(configuration);
    let localStream = await navigator.mediaDevices?.getUserMedia(constraint);
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });
    const localVideo = document.querySelector('video#remoteVideo') as HTMLVideoElement;
    localVideo.srcObject = localStream
    this.callService.getOfferOrAnswerOrIce("offer", {
      async callBackFn(data: any) {
        if (data) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(data));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          callService.getOfferOrAnswerOrIce("ice/emit", {
            async callBackFn(data: any) {
              if (data) {
                try {
                  await peerConnection.addIceCandidate(data);
                } catch (e) {
                  console.error('Error adding received ice candidate 2', e);
                }
              }
            }
          })
        await callService.writeOfferOrAnswerOrIce('answer', answer)
        }
      }
    })

    peerConnection.addEventListener('icecandidate', event => {
      if (event.candidate) {
        this.callService.writeOfferOrAnswerOrIce('ice/receipt', event.candidate)
      }
    });

    peerConnection.addEventListener('track', event => {
      const remoteVideo = document.querySelector('video#localVideo') as HTMLVideoElement;
      let remoteStream = new MediaStream()
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track);
        remoteVideo.srcObject = remoteStream;
      });
    });

  }
}

