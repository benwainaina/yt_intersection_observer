import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';

interface ITermAndCondition {
  verse: string;
  content: string;
}

const mockTNCs = [
  {
    verse: '2 Corinthians 8:21',
    content:
      'For we are taking pains to do what is right, not only in the eyes of the Lord but also in the eyes of man.',
  },
  {
    verse: '2 Timothy 2:15',
    content:
      'Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.',
  },
  {
    verse: 'Colossians 3:9',
    content:
      'Do not lie to each other, since you have taken off your old self with its practices',
  },
  {
    verse: 'Ephesians 4:25',
    content:
      'Therefore each of you must put off falsehood and speak truthfully to your neighbor, for we are all members of one body.',
  },
  {
    verse: 'James 1:26',
    content:
      'Those who consider themselves religious and yet do not keep a tight rein on their tongues deceive themselves, and their religion is worthless.',
  },
  {
    verse: 'James 3:17',
    content:
      'But the wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit, impartial and sincere.',
  },
  {
    verse: 'Luke 6:31',
    content: 'Do to others as you would have them do to you.',
  },
  {
    verse: 'Matthew 5:8',
    content: 'Blessed are the pure in heart, for they will see God.',
  },
  {
    verse: 'Proverbs 10:9',
    content:
      'Whoever walks in integrity walks securely, but whoever takes crooked paths will be found out.',
  },
  {
    verse: 'Proverbs 11:3',
    content:
      'The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.',
  },
];

@Component({
  selector: 'lib-tnc',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: 'tnc.component.html',
  styleUrl: 'tnc.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TncComponent {
  public showTNCs: boolean = false;
  public termsAndConditions: Array<ITermAndCondition> = [];
  public userHasRead: boolean = false;
  @ViewChild('wrapper__overlay__content__tncs', { static: false })
  private _wrapper__overlay__content__tncs!: ElementRef<HTMLDivElement>;
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {}

  public toggleTNCs(): void {
    this.showTNCs = !this.showTNCs;
    this._commonChangeDetector();
    this._observeForLastElement();
    this.termsAndConditions = mockTNCs;
    this._commonChangeDetector();
  }

  public closeTNCs(): void {
    if (this.userHasRead) {
      this.toggleTNCs();
    }
  }

  private _observeForLastElement(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation: any) => {
        if (mutation.addedNodes[0].className.includes('is-last-element')) {
          const { addedNodes } = mutation;
          this._listenForIntersection(addedNodes[0]);
          observer.disconnect();
        }
      });
    });
    observer.observe(this._wrapper__overlay__content__tncs.nativeElement, {
      childList: true,
    });
  }

  private _listenForIntersection(targetELement: HTMLElement): void {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          this.userHasRead = true;
          this._commonChangeDetector();
        }
      },
      {
        root: this._wrapper__overlay__content__tncs.nativeElement,
        threshold: 1,
        rootMargin: '0px 0px -12px 0px',
      }
    );
    observer.observe(targetELement);
  }

  private _commonChangeDetector(): void {
    this._changeDetectorRef.detectChanges();
  }
}
