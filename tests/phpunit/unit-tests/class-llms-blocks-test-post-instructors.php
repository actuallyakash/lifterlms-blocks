<?php
/**
 * Test LLMS_Blocks_Post_Instructors
 *
 * @package LifterLMS_Blocks/Tests
 *
 * @group post_instructors
 *
 * @since 1.6.0
 * @version 1.6.0
 */
class LLMS_Blocks_Test_Post_Instructors extends LLMS_Blocks_Unit_Test_Case {

	/**
	 * Setup the test case.
	 *
	 * @since 1.6.0
	 *
	 * @return void
	 */
	public function setUp() {
		parent::setUp();
		$this->instance = new LLMS_Blocks_Post_Instructors();
	}

	/**
	 * Don't set an instructor during a post update.
	 *
	 * @since 1.6.0
	 *
	 * @return void
	 */
	public function test_maybe_set_default_instructor_update() {

		$post = $this->factory->post->create_and_get();
		$this->assertFalse( $this->instance->maybe_set_default_instructor( $post->ID, $post, true ) );

	}

	/**
	 * Don't set an instructor if the post doesn't have an author.
	 *
	 * @since 1.6.0
	 *
	 * @return void
	 */
	public function test_maybe_set_default_instructor_no_author() {

		$post = $this->factory->post->create_and_get();
		$this->assertFalse( $this->instance->maybe_set_default_instructor( $post->ID, $post, false ) );

	}

	/**
	 * Don't set an instructor if the post isn't a LifterLMS post type
	 *
	 * @since 1.6.0
	 *
	 * @return void
	 */
	public function test_maybe_set_default_instructor_not_llms_post_type() {

		$post = $this->factory->post->create_and_get( array( 'post_author' => 1 ) );
		$this->assertFalse( $this->instance->maybe_set_default_instructor( $post->ID, $post, false ) );

	}

	/**
	 * Don't set an instructor if the post isn't a support LifterLMS post type
	 *
	 * @since 1.6.0
	 *
	 * @return void
	 */
	public function test_maybe_set_default_instructor_not_supported_llms_post_type() {

		$post = $this->factory->post->create_and_get( array(
			'post_author' => 1,
			'post_type' => 'lesson',
		) );
		$this->assertFalse( $this->instance->maybe_set_default_instructor( $post->ID, $post, false ) );

	}

	/**
	 * Setting instructor works.
	 *
	 * @since 1.6.0
	 *
	 * @return [type]
	 */
	public function test_maybe_set_default_instructor_successe() {

		$post = $this->factory->post->create_and_get( array(
			'post_author' => 1,
			'post_type' => 'course',
		) );
		$this->assertTrue( $this->instance->maybe_set_default_instructor( $post->ID, $post, false ) );

		$expect = llms_get_instructors_defaults();
		$expect['id'] = 1;

		$this->assertEquals( array( $expect ), llms_get_post( $post )->get_instructors() );

	}

	/**
	 * Test setting default instructor via hooks.
	 *
	 * @since 1.6.0
	 *
	 * @return void
	 */
	public function test_maybe_set_default_instructor_integration() {

		foreach ( array( 'course', 'llms_membership' ) as $post_type ) {

			// No author on the post.
			$obj = llms_get_post( $this->factory->post->create( array(
				'post_type' => $post_type,
			) ) );
			$this->assertEquals( array(), $obj->get( 'instructors' ) );

			// nothing happens on post update.
			$obj->set( 'title', 'new title' );
			$this->assertEquals( array(), $obj->get( 'instructors' ) );

			// Has a user.
			$user = $this->factory->user->create( array( 'role' => 'administrator' ) );
			$obj = llms_get_post( $this->factory->post->create( array(
				'post_type' => 'course',
				'post_author' => $user,
			) ) );

			$expect = llms_get_instructors_defaults();
			$expect['id'] = $user;

			$this->assertEquals( array( $expect ), $obj->get_instructors() );

		}

	}

}
