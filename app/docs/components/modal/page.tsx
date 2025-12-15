"use client";

import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { CodePreview, CodeBlock } from "@/components/docs/code-preview";
import { TableOfContents } from "@/components/docs/toc";

const tocItems = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "sizes", title: "Sizes" },
  { id: "animations", title: "Animations" },
  { id: "placement", title: "Placement" },
  { id: "scroll-behavior", title: "Scroll Behavior" },
  { id: "radius-shadow", title: "Radius & Shadow" },
  { id: "overlay", title: "Overlay Options" },
  { id: "close-button", title: "Close Button" },
  { id: "non-dismissable", title: "Non-Dismissable" },
  { id: "custom-styling", title: "Custom Styling" },
  { id: "with-form", title: "With Form" },
  { id: "props", title: "Props" },
];

export default function ModalPage() {
  const basicModal = useModal();
  const sizeXsModal = useModal();
  const sizeSmModal = useModal();
  const sizeMdModal = useModal();
  const sizeLgModal = useModal();
  const sizeXlModal = useModal();
  const size2xlModal = useModal();
  const size3xlModal = useModal();
  const sizeFullModal = useModal();
  const slideUpModal = useModal();
  const slideDownModal = useModal();
  const fadeModal = useModal();
  const flipXModal = useModal();
  const flipYModal = useModal();
  const topModal = useModal();
  const bottomModal = useModal();
  const scrollInsideModal = useModal();
  const scrollOutsideModal = useModal();
  const radiusModal = useModal();
  const shadowModal = useModal();
  const noOverlayModal = useModal();
  const noBlurModal = useModal();
  const customOverlayModal = useModal();
  const outsideCloseModal = useModal();
  const noCloseModal = useModal();
  const nonDismissableModal = useModal();
  const customModal = useModal();
  const formModal = useModal();

  return (
          <div className="flex gap-16">
        <div className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">Modal</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A flexible modal dialog with multiple animations, sizes, placements, and overlay options.
            </p>
          </header>

          <div className="space-y-16">

            {/* Installation */}
            <section id="installation">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Installation</h2>
              <CodeBlock code="npx sparkui add modal" language="bash" />
            </section>

            {/* Usage */}
            <section id="usage">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Usage</h2>
              <CodeBlock
                code={`import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from "@/components/ui/modal"

export default function Example() {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <Button onClick={open}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={close}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Your content here</ModalBody>
        <ModalFooter>
          <Button variant="flat" onClick={close}>Cancel</Button>
          <Button color="primary" onClick={close}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}`}
              />
              <div className="mt-6">
                <CodePreview
                  preview={
                    <>
                      <Button color="primary" onClick={basicModal.open}>Open Modal</Button>
                      <Modal isOpen={basicModal.isOpen} onClose={basicModal.close}>
                        <ModalHeader>Welcome to SparkUI</ModalHeader>
                        <ModalBody>
                          <p>This is a basic modal with default settings. It includes a header, body, and footer with action buttons.</p>
                        </ModalBody>
                        <ModalFooter>
                          <Button variant="flat" onClick={basicModal.close}>Cancel</Button>
                          <Button color="primary" onClick={basicModal.close}>Got it!</Button>
                        </ModalFooter>
                      </Modal>
                    </>
                  }
                  code={`<Button onClick={open}>Open Modal</Button>
<Modal isOpen={isOpen} onClose={close}>
  <ModalHeader>Welcome to SparkUI</ModalHeader>
  <ModalBody>
    <p>This is a basic modal with default settings.</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="flat" onClick={close}>Cancel</Button>
    <Button color="primary" onClick={close}>Got it!</Button>
  </ModalFooter>
</Modal>`}
                />
              </div>
            </section>

            {/* Sizes */}
            <section id="sizes">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Sizes</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Ten size options from xs to full screen: xs, sm, md (default), lg, xl, 2xl, 3xl, 4xl, 5xl, and full.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button variant="bordered" onClick={sizeXsModal.open}>Open xs</Button>
                    <Button variant="bordered" onClick={sizeSmModal.open}>Open sm</Button>
                    <Button variant="bordered" onClick={sizeMdModal.open}>Open md</Button>
                    <Button variant="bordered" onClick={sizeLgModal.open}>Open lg</Button>
                    <Button variant="bordered" onClick={sizeXlModal.open}>Open xl</Button>
                    <Button variant="bordered" onClick={size2xlModal.open}>Open 2xl</Button>
                    <Button variant="bordered" onClick={size3xlModal.open}>Open 3xl</Button>
                    <Button variant="bordered" onClick={sizeFullModal.open}>Open full</Button>
                    
                    <Modal isOpen={sizeXsModal.isOpen} onClose={sizeXsModal.close} size="xs">
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="flat" onClick={sizeXsModal.close}>Close</Button>
                        <Button color="primary" onClick={sizeXsModal.close}>Action</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={sizeSmModal.isOpen} onClose={sizeSmModal.close} size="sm">
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="flat" onClick={sizeSmModal.close}>Close</Button>
                        <Button color="primary" onClick={sizeSmModal.close}>Action</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={sizeMdModal.isOpen} onClose={sizeMdModal.close} size="md">
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="flat" onClick={sizeMdModal.close}>Close</Button>
                        <Button color="primary" onClick={sizeMdModal.close}>Action</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={sizeLgModal.isOpen} onClose={sizeLgModal.close} size="lg">
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="flat" onClick={sizeLgModal.close}>Close</Button>
                        <Button color="primary" onClick={sizeLgModal.close}>Action</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={sizeXlModal.isOpen} onClose={sizeXlModal.close} size="xl">
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="flat" onClick={sizeXlModal.close}>Close</Button>
                        <Button color="primary" onClick={sizeXlModal.close}>Action</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={size2xlModal.isOpen} onClose={size2xlModal.close} size="2xl">
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="flat" onClick={size2xlModal.close}>Close</Button>
                        <Button color="primary" onClick={size2xlModal.close}>Action</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={size3xlModal.isOpen} onClose={size3xlModal.close} size="3xl">
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="flat" onClick={size3xlModal.close}>Close</Button>
                        <Button color="primary" onClick={size3xlModal.close}>Action</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={sizeFullModal.isOpen} onClose={sizeFullModal.close} size="full">
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.</p>
                        <p className="mt-3">Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="flat" onClick={sizeFullModal.close}>Close</Button>
                        <Button color="primary" onClick={sizeFullModal.close}>Action</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                }
                code={`<Modal size="xs">...</Modal>
<Modal size="sm">...</Modal>
<Modal size="md">...</Modal>
<Modal size="lg">...</Modal>
<Modal size="xl">...</Modal>
<Modal size="2xl">...</Modal>
<Modal size="3xl">...</Modal>
<Modal size="4xl">...</Modal>
<Modal size="5xl">...</Modal>
<Modal size="full">...</Modal>`}
              />
            </section>


            {/* Animations */}
            <section id="animations">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Animations</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Seven animation styles: scale (default), slide-up, slide-down, fade, flip-x, flip-y, and none.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button variant="bordered" onClick={slideUpModal.open}>Slide Up</Button>
                    <Button variant="bordered" onClick={slideDownModal.open}>Slide Down</Button>
                    <Button variant="bordered" onClick={fadeModal.open}>Fade</Button>
                    <Button variant="bordered" onClick={flipXModal.open}>Flip X</Button>
                    <Button variant="bordered" onClick={flipYModal.open}>Flip Y</Button>
                    
                    <Modal isOpen={slideUpModal.isOpen} onClose={slideUpModal.close} animation="slide-up">
                      <ModalHeader>Slide Up Animation</ModalHeader>
                      <ModalBody>Modal slides up from the bottom.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={slideUpModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={slideDownModal.isOpen} onClose={slideDownModal.close} animation="slide-down">
                      <ModalHeader>Slide Down Animation</ModalHeader>
                      <ModalBody>Modal slides down from the top.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={slideDownModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={fadeModal.isOpen} onClose={fadeModal.close} animation="fade">
                      <ModalHeader>Fade Animation</ModalHeader>
                      <ModalBody>Simple fade in/out effect.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={fadeModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={flipXModal.isOpen} onClose={flipXModal.close} animation="flip-x">
                      <ModalHeader>Flip X Animation</ModalHeader>
                      <ModalBody>3D flip effect on the X axis (vertical flip).</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={flipXModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={flipYModal.isOpen} onClose={flipYModal.close} animation="flip-y">
                      <ModalHeader>Flip Y Animation</ModalHeader>
                      <ModalBody>3D flip effect on the Y axis (horizontal flip).</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={flipYModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                }
                code={`<Modal animation="scale">...</Modal>
<Modal animation="slide-up">...</Modal>
<Modal animation="slide-down">...</Modal>
<Modal animation="fade">...</Modal>
<Modal animation="flip-x">...</Modal>
<Modal animation="flip-y">...</Modal>
<Modal animation="none">...</Modal>`}
              />
            </section>

            {/* Placement */}
            <section id="placement">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Placement</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Position the modal at center (default), top, or bottom of the viewport.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button variant="bordered" onClick={topModal.open}>Top</Button>
                    <Button variant="bordered" onClick={bottomModal.open}>Bottom</Button>
                    
                    <Modal isOpen={topModal.isOpen} onClose={topModal.close} placement="top" animation="slide-down">
                      <ModalHeader>Top Placement</ModalHeader>
                      <ModalBody>Modal appears at the top of the screen.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={topModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={bottomModal.isOpen} onClose={bottomModal.close} placement="bottom" animation="slide-up">
                      <ModalHeader>Bottom Placement</ModalHeader>
                      <ModalBody>Modal appears at the bottom of the screen.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={bottomModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                }
                code={`<Modal placement="center">...</Modal>
<Modal placement="top">...</Modal>
<Modal placement="bottom">...</Modal>`}
              />
            </section>

            {/* Scroll Behavior */}
            <section id="scroll-behavior">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Scroll Behavior</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Control how content scrolls: inside (body scrolls within modal) or outside (entire modal scrolls).
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button variant="bordered" onClick={scrollInsideModal.open}>Scroll Inside</Button>
                    <Button variant="bordered" onClick={scrollOutsideModal.open}>Scroll Outside</Button>
                    
                    <Modal isOpen={scrollInsideModal.isOpen} onClose={scrollInsideModal.close} scrollBehavior="inside" size="sm">
                      <ModalHeader>Scroll Inside</ModalHeader>
                      <ModalBody>
                        <div className="space-y-4">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <p key={i}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.</p>
                          ))}
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={scrollInsideModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={scrollOutsideModal.isOpen} onClose={scrollOutsideModal.close} scrollBehavior="outside" size="sm">
                      <ModalHeader>Scroll Outside</ModalHeader>
                      <ModalBody>
                        <div className="space-y-4">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <p key={i}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.</p>
                          ))}
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={scrollOutsideModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                }
                code={`<Modal scrollBehavior="inside">...</Modal>
<Modal scrollBehavior="outside">...</Modal>`}
              />
            </section>

            {/* Radius & Shadow */}
            <section id="radius-shadow">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Radius & Shadow</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Customize border radius and shadow intensity for different visual styles.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button variant="bordered" onClick={radiusModal.open}>Custom Radius</Button>
                    <Button variant="bordered" onClick={shadowModal.open}>Custom Shadow</Button>
                    
                    <Modal isOpen={radiusModal.isOpen} onClose={radiusModal.close} radius="3xl" shadow="lg">
                      <ModalHeader>Large Radius</ModalHeader>
                      <ModalBody>Modal with extra rounded corners (3xl radius).</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={radiusModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={shadowModal.isOpen} onClose={shadowModal.close} radius="lg" shadow="none">
                      <ModalHeader>No Shadow</ModalHeader>
                      <ModalBody>Modal without shadow for a flat look.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={shadowModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                }
                code={`<Modal radius="none | sm | md | lg | xl | 2xl | 3xl">...</Modal>
<Modal shadow="none | sm | md | lg | xl | 2xl">...</Modal>`}
              />
            </section>

            {/* Overlay Options */}
            <section id="overlay">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Overlay Options</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Customize or disable the overlay backdrop. Control blur effect and overlay color.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button variant="bordered" onClick={noOverlayModal.open}>No Overlay</Button>
                    <Button variant="bordered" onClick={noBlurModal.open}>No Blur</Button>
                    <Button variant="bordered" onClick={customOverlayModal.open}>Custom Color</Button>
                    
                    <Modal isOpen={noOverlayModal.isOpen} onClose={noOverlayModal.close} overlay={false}>
                      <ModalHeader>No Overlay</ModalHeader>
                      <ModalBody>Modal without backdrop overlay.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={noOverlayModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={noBlurModal.isOpen} onClose={noBlurModal.close} overlayBlur={false}>
                      <ModalHeader>No Blur</ModalHeader>
                      <ModalBody>Overlay without blur effect.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={noBlurModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={customOverlayModal.isOpen} onClose={customOverlayModal.close} overlayColor="rgba(139, 92, 246, 0.3)">
                      <ModalHeader>Custom Overlay</ModalHeader>
                      <ModalBody>Purple tinted overlay backdrop.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={customOverlayModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                }
                code={`<Modal overlay={false}>...</Modal>
<Modal overlayBlur={false}>...</Modal>
<Modal overlayColor="rgba(139, 92, 246, 0.3)">...</Modal>`}
              />
            </section>

            {/* Close Button */}
            <section id="close-button">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Close Button</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Position the close button inside or outside the modal, or hide it completely.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button variant="bordered" onClick={outsideCloseModal.open}>Outside Close</Button>
                    <Button variant="bordered" onClick={noCloseModal.open}>No Close Button</Button>
                    
                    <Modal isOpen={outsideCloseModal.isOpen} onClose={outsideCloseModal.close} closeButtonPosition="outside">
                      <ModalHeader>Outside Close Button</ModalHeader>
                      <ModalBody>Close button positioned outside the modal.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={outsideCloseModal.close}>Done</Button>
                      </ModalFooter>
                    </Modal>
                    
                    <Modal isOpen={noCloseModal.isOpen} onClose={noCloseModal.close} showCloseButton={false}>
                      <ModalHeader>No Close Button</ModalHeader>
                      <ModalBody>Use footer buttons or ESC to close.</ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={noCloseModal.close}>Close</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                }
                code={`<Modal closeButtonPosition="inside">...</Modal>
<Modal closeButtonPosition="outside">...</Modal>
<Modal showCloseButton={false}>...</Modal>`}
              />
            </section>

            {/* Non-Dismissable */}
            <section id="non-dismissable">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Non-Dismissable</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Prevent closing via overlay click or ESC key. User must use explicit actions.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button variant="bordered" onClick={nonDismissableModal.open}>Non-Dismissable</Button>
                    
                    <Modal isOpen={nonDismissableModal.isOpen} onClose={nonDismissableModal.close} isDismissable={false}>
                      <ModalHeader>Important Action Required</ModalHeader>
                      <ModalBody>
                        <p>This modal cannot be dismissed by clicking outside or pressing ESC.</p>
                        <p className="mt-2 text-sm">You must click the button below to close it.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={nonDismissableModal.close}>I Understand</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                }
                code={`<Modal isDismissable={false}>
  <ModalHeader>Important Action Required</ModalHeader>
  <ModalBody>This modal cannot be dismissed easily.</ModalBody>
  <ModalFooter>
    <Button onClick={close}>I Understand</Button>
  </ModalFooter>
</Modal>`}
              />
            </section>


            {/* Custom Styling */}
            <section id="custom-styling">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">Custom Styling</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Apply custom classes to the modal and overlay for unique designs.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white" onClick={customModal.open}>
                      Gradient Modal
                    </Button>
                    
                    <Modal 
                      isOpen={customModal.isOpen} 
                      onClose={customModal.close}
                      className="bg-gradient-to-br from-violet-950 to-pink-950 border-violet-500/30"
                      overlayColor="rgba(139, 92, 246, 0.2)"
                    >
                      <ModalHeader>
                        <span className="text-gradient">Custom Styled Modal</span>
                      </ModalHeader>
                      <ModalBody>
                        <p className="text-violet-200">This modal has a custom gradient background and styled overlay.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="bordered" className="border-violet-500 text-violet-300" onClick={customModal.close}>Cancel</Button>
                        <Button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white" onClick={customModal.close}>
                          Awesome!
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                }
                code={`<Modal 
  className="bg-gradient-to-br from-violet-950 to-pink-950"
  overlayColor="rgba(139, 92, 246, 0.2)"
>
  <ModalHeader>Custom Styled Modal</ModalHeader>
  <ModalBody>Custom gradient background.</ModalBody>
  <ModalFooter>...</ModalFooter>
</Modal>`}
              />
            </section>

            {/* With Form */}
            <section id="with-form">
              <h2 className="text-xl font-semibold mb-4 scroll-mt-6">With Form</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use modals for forms, dialogs, and user input collection.
              </p>
              <CodePreview
                preview={
                  <div className="flex flex-wrap gap-3">
                    <Button color="primary" onClick={formModal.open}>Sign Up</Button>
                    
                    <Modal isOpen={formModal.isOpen} onClose={formModal.close} size="sm">
                      <ModalHeader>Create Account</ModalHeader>
                      <ModalBody>
                        <div className="space-y-4">
                          <Input label="Name" placeholder="Enter your name" />
                          <Input label="Email" placeholder="Enter your email" type="email" />
                          <Input label="Password" placeholder="Create a password" type="password" />
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="flat" onClick={formModal.close}>Cancel</Button>
                        <Button color="primary" onClick={formModal.close}>Sign Up</Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                }
                code={`<Modal isOpen={isOpen} onClose={close} size="sm">
  <ModalHeader>Create Account</ModalHeader>
  <ModalBody>
    <div className="space-y-4">
      <Input label="Name" placeholder="Enter your name" />
      <Input label="Email" placeholder="Enter your email" />
      <Input label="Password" type="password" />
    </div>
  </ModalBody>
  <ModalFooter>
    <Button variant="flat" onClick={close}>Cancel</Button>
    <Button color="primary">Sign Up</Button>
  </ModalFooter>
</Modal>`}
              />
            </section>


            {/* Props */}
            <section id="props">
              <h2 className="text-xl font-semibold mb-6 scroll-mt-6">Props</h2>
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left py-4 px-5 font-medium">Prop</th>
                      <th className="text-left py-4 px-5 font-medium">Type</th>
                      <th className="text-left py-4 px-5 font-medium">Default</th>
                      <th className="text-left py-4 px-5 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">isOpen</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Controls modal visibility</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">onClose</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">() =&gt; void</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Called when modal should close</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">size</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">xs | sm | md | lg | xl | 2xl | 3xl | 4xl | 5xl | full</td>
                      <td className="py-4 px-5 font-mono text-xs">md</td>
                      <td className="py-4 px-5">Modal width</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">placement</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">center | top | bottom</td>
                      <td className="py-4 px-5 font-mono text-xs">center</td>
                      <td className="py-4 px-5">Vertical position</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">animation</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">scale | slide-up | slide-down | fade | flip-x | flip-y | none</td>
                      <td className="py-4 px-5 font-mono text-xs">scale</td>
                      <td className="py-4 px-5">Animation style</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">overlay</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">true</td>
                      <td className="py-4 px-5">Show backdrop overlay</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">overlayBlur</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">true</td>
                      <td className="py-4 px-5">Apply blur to overlay</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">overlayColor</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">rgba(0,0,0,0.5)</td>
                      <td className="py-4 px-5">Custom overlay color</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">closeOnOverlayClick</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">true</td>
                      <td className="py-4 px-5">Close on backdrop click</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">closeOnEsc</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">true</td>
                      <td className="py-4 px-5">Close on ESC key</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">showCloseButton</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">true</td>
                      <td className="py-4 px-5">Show X close button</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">closeButtonPosition</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">inside | outside</td>
                      <td className="py-4 px-5 font-mono text-xs">inside</td>
                      <td className="py-4 px-5">Close button placement</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">isDismissable</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">true</td>
                      <td className="py-4 px-5">Allow dismissing modal</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">preventScroll</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">true</td>
                      <td className="py-4 px-5">Lock body scroll (with scrollbar compensation)</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">scrollBehavior</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">inside | outside</td>
                      <td className="py-4 px-5 font-mono text-xs">inside</td>
                      <td className="py-4 px-5">How content scrolls</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">radius</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">none | sm | md | lg | xl | 2xl | 3xl</td>
                      <td className="py-4 px-5 font-mono text-xs">2xl</td>
                      <td className="py-4 px-5">Border radius</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">shadow</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">none | sm | md | lg | xl | 2xl</td>
                      <td className="py-4 px-5 font-mono text-xs">2xl</td>
                      <td className="py-4 px-5">Shadow intensity</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">lazyMount</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">true</td>
                      <td className="py-4 px-5">Only render on first open</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">keepMounted</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">boolean</td>
                      <td className="py-4 px-5 font-mono text-xs">false</td>
                      <td className="py-4 px-5">Keep in DOM when closed</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">initialFocusRef</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">RefObject</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Element to focus on open</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">finalFocusRef</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">RefObject</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Element to focus on close</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">onOpenChange</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">(isOpen: boolean) =&gt; void</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Callback on state change</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">motionProps</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">{`{ duration?, ease? }`}</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Custom animation timing</td>
                    </tr>
                    <tr className="hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-5 font-mono text-foreground text-sm">className</td>
                      <td className="py-4 px-5 font-mono text-xs text-primary/80">string</td>
                      <td className="py-4 px-5 font-mono text-xs">-</td>
                      <td className="py-4 px-5">Additional modal classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="hidden xl:block w-52 shrink-0">
          <div className="sticky top-6">
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
  );
}
